import { LocationType } from '@/modules/locations/types/LocationType';
import { TreeItem } from '@/modules/utils/tree';
import { TreeCategoryType } from '../types/CategoryType';
import { AssetType } from '@/modules/assets/types/AssetType';

export function findAssetParent(
  parentCategory: 'location',
  treeItem: TreeItem,
  locations: LocationType[]
): TreeItem | null {
  const parentLocation = locations.find(
    (location) =>
      location.id === treeItem.locationId || location.id === treeItem.parentId
  );

  if (parentLocation) {
    const parentTreeItem = {
      ...parentLocation,
      category: parentCategory,
      lineage: [parentLocation.id],
      children: [
        {
          ...treeItem,
          lineage: [parentLocation.id, ...treeItem.lineage],
        },
      ],
    };

    if (!parentLocation.parentId) {
      return parentTreeItem;
    }

    return findAssetParent('location', parentTreeItem, locations);
  }

  return null;
}
