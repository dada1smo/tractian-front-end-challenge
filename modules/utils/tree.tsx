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

export function getRoot(
  locations: LocationType[],
  assets: AssetType[]
): {
  root: TreeItem[];
  childrenLocation: LocationType[];
  childrenAsset: AssetType[];
} {
  const root: TreeItem[] = [];
  const childrenLocation: LocationType[] = [];
  const childrenAsset: AssetType[] = [];

  locations.forEach((location) => {
    if (location.parentId !== null) {
      return childrenLocation.push(location);
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
      return childrenAsset.push(asset);
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

  return { root, childrenLocation, childrenAsset };
}

export function determineAssetCategory(
  sensorType?: string | null
): TreeCategoryType {
  if (!sensorType) {
    return 'asset';
  }

  return 'component';
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
