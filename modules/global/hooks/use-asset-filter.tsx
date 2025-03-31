import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { findAllChildren, TreeItem } from '@/modules/utils/tree';
import { useEffect, useState } from 'react';
import { findParents } from '@/modules/utils/find';
import { formatIntoTreeItem } from '@/modules/utils/format';
import { mergeObjectsById } from '@/modules/utils/merge';

export default function useAssetFilter(
  tree: TreeItem[],
  locations: LocationType[],
  assets: AssetType[]
) {
  const [filterType, setFilterType] = useState<
    'sensor' | 'status' | 'name' | 'none'
  >('none');
  const [filteredTree, setFilteredTree] = useState<TreeItem[]>(tree);

  useEffect(() => {
    if (tree.length === filteredTree.length) {
      setFilterType('none');
    }
  }, [tree.length, filteredTree.length]);

  function handleFilterBySensorType(sensorType: 'energy' | 'vibration') {
    setFilterType('sensor');
    setFilteredTree(filterBySensorType(sensorType, tree));
  }

  function handleFilterByStatus(status: 'alert' | 'operating') {
    setFilterType('status');
    setFilteredTree(filterByStatus(status, tree));
  }

  function handleFilterByName(category: 'location' | 'asset', name: string) {
    setFilterType('name');
    if (category === 'location') {
      setFilteredTree(filterLocationByName(name, assets, locations));
    }
    if (category === 'asset') {
      setFilteredTree(filterAssetByName(name, tree));
    }
  }

  const clearFilters = () => {
    setFilteredTree(tree);
    setFilterType('none');
  };

  return {
    filteredTree,
    handleFilterBySensorType,
    handleFilterByStatus,
    handleFilterByName,
    filterType,
    clearFilters,
  };
}

function filterBySensorType(
  sensorType: 'energy' | 'vibration',
  tree: TreeItem[]
): TreeItem[] {
  function recursiveFilter(node: TreeItem): TreeItem | null {
    let hasEnergyChild = false;
    const filteredChildren = [];

    for (const child of node.children) {
      const filteredChild = recursiveFilter(child);
      if (filteredChild) {
        hasEnergyChild = true;
        filteredChildren.push(filteredChild);
      }
    }

    if (node.sensorType === sensorType || hasEnergyChild) {
      return { ...node, children: filteredChildren };
    }

    return null;
  }

  return tree.reduce((acc: TreeItem[], node) => {
    const filteredNode = recursiveFilter(node);
    if (filteredNode) acc.push(filteredNode);
    return acc;
  }, []);
}

function filterByStatus(status: 'alert' | 'operating', tree: TreeItem[]) {
  function recursiveFilter(node: TreeItem): TreeItem | null {
    let hasEnergyChild = false;
    const filteredChildren = [];

    for (const child of node.children) {
      const filteredChild = recursiveFilter(child);
      if (filteredChild) {
        hasEnergyChild = true;
        filteredChildren.push(filteredChild);
      }
    }

    if (node.status === status || hasEnergyChild) {
      return { ...node, children: filteredChildren };
    }

    return null;
  }

  return tree.reduce((acc: TreeItem[], node) => {
    const filteredNode = recursiveFilter(node);
    if (filteredNode) acc.push(filteredNode);
    return acc;
  }, []);
}

function filterAssetByName(searchString: string, tree: TreeItem[]): TreeItem[] {
  if (!searchString || typeof searchString !== 'string') {
    return tree;
  }

  const normalizedSearch: string = searchString.toLowerCase();
  const matchedItemsMap: Map<string, TreeItem> = new Map();
  const parentChildMap: Map<string, string[]> = new Map();
  const directMatchIds: Set<string> = new Set();

  function indexTree(items: TreeItem[], parentId: string | null = null): void {
    for (const item of items) {
      if (item.name.toLowerCase().includes(normalizedSearch)) {
        directMatchIds.add(item.id);
      }

      if (parentId) {
        if (!parentChildMap.has(parentId)) {
          parentChildMap.set(parentId, []);
        }
        parentChildMap.get(parentId)!.push(item.id);
      }

      if (!parentChildMap.has(item.id)) {
        parentChildMap.set(item.id, []);
      }

      const itemCopy: TreeItem = { ...item, children: [] };
      matchedItemsMap.set(item.id, itemCopy);

      if (item.children && item.children.length > 0) {
        indexTree(item.children, item.id);
      }
    }
  }

  function findAllMatchIds(): Set<string> {
    const allMatchIds: Set<string> = new Set(directMatchIds);

    function findDescendants(
      itemId: string,
      visited: Set<string> = new Set()
    ): void {
      if (visited.has(itemId)) return;
      visited.add(itemId);

      allMatchIds.add(itemId);

      const children = parentChildMap.get(itemId) || [];
      for (const childId of children) {
        findDescendants(childId, visited);
      }
    }

    function findAncestors(items: TreeItem[]): void {
      const itemsToProcess: TreeItem[] = [...items];
      const processed: Set<string> = new Set();

      while (itemsToProcess.length > 0) {
        const item = itemsToProcess.pop()!;

        if (processed.has(item.id)) continue;
        processed.add(item.id);

        if (item.parentId && matchedItemsMap.has(item.parentId)) {
          allMatchIds.add(item.parentId);
          const parent = matchedItemsMap.get(item.parentId)!;
          itemsToProcess.push(parent);
        }

        if (item.children && item.children.length > 0) {
          for (const child of item.children) {
            if (!processed.has(child.id)) {
              itemsToProcess.push(child);
            }
          }
        }
      }
    }

    for (const matchId of directMatchIds) {
      findDescendants(matchId);
    }

    const matchedItems: TreeItem[] = [];
    for (const id of allMatchIds) {
      if (matchedItemsMap.has(id)) {
        matchedItems.push(matchedItemsMap.get(id)!);
      }
    }

    findAncestors(matchedItems);

    return allMatchIds;
  }

  function buildResult(allMatchIds: Set<string>): TreeItem[] {
    const result: TreeItem[] = [];
    const rootIds: Set<string> = new Set();

    for (const id of allMatchIds) {
      const item = matchedItemsMap.get(id)!;
      if (!item.parentId || !allMatchIds.has(item.parentId)) {
        rootIds.add(id);
      }
    }

    function buildSubtree(itemId: string): TreeItem {
      const item: TreeItem = { ...matchedItemsMap.get(itemId)!, children: [] };
      const childIds = parentChildMap.get(itemId) || [];

      for (const childId of childIds) {
        if (allMatchIds.has(childId)) {
          item.children.push(buildSubtree(childId));
        }
      }

      return item;
    }

    for (const rootId of rootIds) {
      result.push(buildSubtree(rootId));
    }

    return result;
  }

  indexTree(tree);
  const allMatchIds = findAllMatchIds();
  return buildResult(allMatchIds);
}

function filterLocationByName(
  name: string,
  assets: AssetType[],
  locations: LocationType[]
) {
  const filterLocations = locations
    .filter((asset) =>
      asset.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    )
    .map((asset) => formatIntoTreeItem('location', asset))
    .map((asset) => {
      return {
        ...asset,
        children: findAllChildren(locations, assets, asset),
      };
    })
    .map((asset) => {
      return findParents(asset, locations, assets);
    })
    .filter((asset) => !asset.parentId && !asset.locationId);

  return mergeObjectsById(filterLocations);
}
