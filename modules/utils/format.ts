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
