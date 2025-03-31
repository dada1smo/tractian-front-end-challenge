import { AssetType } from '../assets/types/AssetType';
import { TreeCategoryType } from '../global/types/CategoryType';

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
