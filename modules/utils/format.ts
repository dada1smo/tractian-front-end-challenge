import { AssetType } from '../assets/types/AssetType';
import { TreeCategoryType } from '../global/types/CategoryType';
import { LocationType } from '../locations/types/LocationType';
import { TreeItem } from './tree';

export function formatIntoTreeItem(
  category: TreeCategoryType,
  item: LocationType | AssetType
): TreeItem {
  return { ...item, category: category, children: [], lineage: [item.id] };
}

export function formatLocationsIntoTree(locations: LocationType[]) {
  return locations.map((location) => formatIntoTreeItem('location', location));
}

export function formatAssetsIntoTree(assets: AssetType[]) {
  return assets.map((asset) =>
    formatIntoTreeItem(determineAssetCategory(asset.sensorType), {
      ...asset,
      parentId: determineParent(asset.parentId, asset.locationId),
    })
  );
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
