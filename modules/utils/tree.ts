import { AssetType } from '../assets/types/AssetType';
import { TreeCategoryType } from '../global/types/CategoryType';
import { LocationType } from '../locations/types/LocationType';

export interface TreeItem extends AssetType {
  children: TreeItem[];
  category: TreeCategoryType;
  lineage: string[];
  open?: boolean;
  selected?: boolean;
}

export async function buildTreeAsync(items: TreeItem[]): Promise<TreeItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 0));

  const itemMap = new Map();
  const rootNodes = [];

  for (const item of items) {
    item.children = [];
    itemMap.set(item.id, item);
  }

  for (const item of items) {
    if (item.parentId === null) {
      rootNodes.push(item);
    } else {
      const parent = itemMap.get(item.parentId);
      if (parent) {
        parent.children.push(item);
      }
    }
  }

  return rootNodes;
}

export function findChildrenAsset(
  data: AssetType[],
  parentId: string,
  locationId: string,
  lineage: string[]
): TreeItem[] {
  return data
    .filter(
      (asset) => asset.parentId === parentId || asset.locationId === locationId
    )
    .map((asset) => ({
      ...asset,
      children: [],
      category: determineAssetCategory(asset.sensorType),
      lineage: [...lineage, asset.id],
    }));
}

export function findChildrenLocation(
  data: LocationType[],
  parentId: string,
  lineage: string[]
): TreeItem[] {
  return data
    .filter((location) => location.parentId === parentId)
    .map((location) => ({
      ...location,
      children: [],
      category: 'location',
      lineage: [...lineage, location.id],
    }));
}

export function findChildren(
  locations: LocationType[],
  assets: AssetType[],
  parentId: string,
  locationId: string,
  lineage: string[]
): TreeItem[] {
  return [
    ...findChildrenLocation(locations, parentId, lineage),
    ...findChildrenAsset(assets, parentId, locationId, lineage),
  ];
}

export function buildChildrenMap(
  locations: LocationType[],
  assets: AssetType[]
) {
  const locationMap = new Map();
  const assetMap = new Map();

  locations.forEach((loc) => {
    if (!locationMap.has(loc.parentId)) {
      locationMap.set(loc.parentId, []);
    }
    locationMap.get(loc.parentId).push({
      ...loc,
      children: [],
      category: 'location',
    });
  });

  assets.forEach((asset) => {
    if (!assetMap.has(asset.parentId)) {
      assetMap.set(asset.parentId, []);
    }
    assetMap.get(asset.parentId).push({
      ...asset,
      children: [],
      category: determineAssetCategory(asset.sensorType),
    });
  });

  return { locationMap, assetMap };
}

export function findAllChildren(
  locations: LocationType[],
  assets: AssetType[],
  rootItem: TreeItem
) {
  const { locationMap, assetMap } = buildChildrenMap(locations, assets);
  const stack = [rootItem];
  const visited = new Set();

  while (stack.length > 0) {
    const node = stack.pop();
    if (node) {
      const nodeId = node.id;

      if (visited.has(nodeId)) continue;
      visited.add(nodeId);

      const children = [
        ...(locationMap.get(nodeId) || []),
        ...(assetMap.get(nodeId) || []),
      ];

      node.children = children;
      stack.push(...children);
    }
  }

  return rootItem.children;
}

// export function findAllChildren(
//   locations: LocationType[],
//   assets: AssetType[],
//   item: TreeItem
// ): TreeItem[] {
//   const children = findChildren(
//     locations,
//     assets,
//     item.id,
//     item.locationId || '0',
//     item.lineage
//   );

//   if (children.length === 0) {
//     return children;
//   }

//   return children.map((child) => {
//     return { ...child, children: findAllChildren(locations, assets, child) };
//   });
// }

export function getRoot(
  locations: LocationType[],
  assets: AssetType[]
): {
  root: TreeItem[];
  childrenLocations: LocationType[];
  childrenAssets: AssetType[];
} {
  const root: TreeItem[] = [];
  const childrenLocations: LocationType[] = [];
  const childrenAssets: AssetType[] = [];

  locations.forEach((location) => {
    if (location.parentId !== null) {
      return childrenLocations.push(location);
    }
    if (location.parentId === null) {
      return root.push({
        ...location,
        children: findChildren(locations, assets, location.id, location.id, [
          location.id,
        ]),
        category: 'location',
        lineage: [location.id],
      });
    }
  });

  assets.forEach((asset) => {
    if (asset.locationId !== null || asset.parentId !== null) {
      return childrenAssets.push(asset);
    }
    if (asset.locationId === null && asset.parentId === null) {
      return root.push({
        ...asset,
        children: findChildren(locations, assets, asset.id, asset.id, [
          asset.id,
        ]),
        category: determineAssetCategory(asset.sensorType),
        lineage: [asset.id],
      });
    }
  });

  return { root, childrenLocations, childrenAssets };
}

export function determineAssetCategory(
  sensorType?: string | null
): TreeCategoryType {
  if (!sensorType) {
    return 'asset';
  }

  return 'component';
}

export function determineParent(
  parentId?: string | null,
  locationId?: string | null
): string | null {
  if (parentId) {
    return parentId;
  }

  if (locationId) {
    return locationId;
  }

  return null;
}

// export function buildTree(data: LocationType[]): TreeItem[] {
//   const children: TreeItem[] = [];
//   const root: TreeItem[] = [];

//   data.forEach((location) => {
//     if (location.parentId !== null) {
//       return children.push({ ...location, children: [], category: 'location' });
//     }

//     if (location.parentId === null) {
//       return root.push({ ...location, children: [], category: 'location' });
//     }
//   });

//   return root;
// }

// export function findParents(assetId: string) {
//   const ids = [assetId];
// }
