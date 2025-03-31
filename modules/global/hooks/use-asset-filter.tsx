import {
  filterAssetByName,
  filterBySensorType,
  filterByStatus,
} from '@/modules/utils/filter';
import { TreeItem } from '@/modules/utils/tree';
import { useEffect, useState } from 'react';

export default function useAssetFilter(tree: TreeItem[]) {
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

  function handleFilterByName(name: string) {
    setFilterType('name');
    setFilteredTree(filterAssetByName(name, tree));
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
