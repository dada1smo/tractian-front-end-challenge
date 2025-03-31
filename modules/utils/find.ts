import { AssetType } from '../assets/types/AssetType';
import { TreeCategoryType } from '../global/types/CategoryType';
import { LocationType } from './../locations/types/LocationType';
import { formatIntoTreeItem } from './format';
import { TreeItem } from './tree';

export function findParentItem(
  childItem: TreeItem,
  parentIdType: 'parentId' | 'locationId',
  parentCategory: TreeCategoryType,
  data: LocationType[] | AssetType[]
) {
  const parent = data.find((item) => item.id === childItem[parentIdType]);

  if (parent) {
    const parentItem = {
      ...formatIntoTreeItem(parentCategory, parent),
      children: [childItem],
    };

    return parentItem;
  }
}

export function findParents(
  item: TreeItem,
  locations: LocationType[],
  assets: AssetType[]
): TreeItem {
  if (item.category === 'location' && item.parentId) {
    const parentItem = findParentItem(item, 'parentId', 'location', locations);

    if (parentItem?.parentId) {
      return findParents(parentItem, locations, assets);
    }

    if (parentItem) {
      return parentItem;
    }
  }

  if (item.locationId) {
    const parentItem = findParentItem(
      item,
      'locationId',
      'location',
      locations
    );

    if (parentItem?.parentId) {
      return findParents(parentItem, locations, assets);
    }

    if (parentItem) {
      return parentItem;
    }
  }

  if (item.parentId) {
    const parentItem = findParentItem(item, 'parentId', 'asset', assets);

    if (parentItem?.parentId) {
      return findParents(parentItem, locations, assets);
    }

    if (parentItem) {
      return parentItem;
    }
  }

  return item;
}
