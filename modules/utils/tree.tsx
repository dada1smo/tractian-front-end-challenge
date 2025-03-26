import { AssetType } from '../assets/types/AssetType';
import { TreeCategoryType } from '../global/types/CategoryType';
import { LocationType } from '../locations/types/LocationType';

export interface TreeItem extends AssetType {
  children: TreeItem[];
  category: TreeCategoryType;
}

export function findChildrenAsset(
  data: AssetType[],
  parentId: string,
  locationId: string
): TreeItem[] {
  return data
    .filter(
      (asset) => asset.parentId === parentId || asset.locationId === locationId
    )
    .map((asset) => ({
      ...asset,
      children: [],
      category: determineAssetCategory(asset.sensorType),
    }));
}

export function findChildrenLocation(
  data: LocationType[],
  parentId: string
): TreeItem[] {
  return data
    .filter((location) => location.parentId === parentId)
    .map((location) => ({ ...location, children: [], category: 'location' }));
}

export function findChildren(
  locations: LocationType[],
  assets: AssetType[],
  parentId: string,
  locationId: string
): TreeItem[] {
  return [
    ...findChildrenLocation(locations, parentId),
    ...findChildrenAsset(assets, parentId, locationId),
  ];
}

export function getRoot(
  locations: LocationType[],
  assets: AssetType[]
): TreeItem[] {
  const rootLocations = locations
    .filter((location) => location.parentId === null)
    .map((location) => ({
      ...location,
      children: findChildren(locations, assets, location.id, location.id),
      category: 'location' as TreeCategoryType,
    }));

  const rootAssets = assets
    .filter((asset) => asset.locationId === null && asset.parentId === null)
    .map((asset) => ({
      ...asset,
      children: [],
      category: determineAssetCategory(asset.sensorType),
    }));

  return [...rootLocations, ...rootAssets];
}

export function determineAssetCategory(
  sensorType?: string | null
): TreeCategoryType {
  if (!sensorType) {
    return 'asset';
  }

  return 'component';
}

export function buildTree(data: LocationType[]): TreeItem[] {
  const children: TreeItem[] = [];
  const root: TreeItem[] = [];

  data.forEach((location) => {
    if (location.parentId !== null) {
      return children.push({ ...location, children: [], category: 'location' });
    }

    if (location.parentId === null) {
      return root.push({ ...location, children: [], category: 'location' });
    }
  });

  return root;
}
