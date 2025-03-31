import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { determineAssetCategory, TreeItem } from '@/modules/utils/tree';
import { useMemo, useState } from 'react';
import { findParents } from '@/modules/utils/find';
import { formatIntoTreeItem } from '@/modules/utils/format';
import { mergeObjectsById } from '@/modules/utils/merge';

export default function useAssetFilter(
  tree: TreeItem[],
  locations: LocationType[],
  assets: AssetType[]
) {
  const [filteredTree, setFilteredTree] = useState<TreeItem[]>(tree);

  const isFiltered = useMemo(
    () => tree.length !== filteredTree.length,
    [tree.length, filteredTree.length]
  );

  function handleFilterBySensorType(sensorType: 'energy' | 'vibration') {
    setFilteredTree(filterBySensorType(sensorType, assets, locations));
  }

  function handleFilterByStatus(status: 'alert' | 'operating') {
    setFilteredTree(filterByStatus(status, assets, locations));
  }

  return {
    filteredTree,
    handleFilterBySensorType,
    handleFilterByStatus,
    isFiltered,
  };
}

function filterBySensorType(
  sensorType: 'energy' | 'vibration',
  assets: AssetType[],
  locations: LocationType[]
) {
  const filterAssets = assets
    .filter((asset) => asset.sensorType === sensorType)
    .map((asset) =>
      formatIntoTreeItem(determineAssetCategory(asset.sensorType), asset)
    )
    .map((asset) => findParents(asset, locations, assets));

  console.log(mergeObjectsById(filterAssets));
  return mergeObjectsById(filterAssets);
}

function filterByStatus(
  status: 'alert' | 'operating',
  assets: AssetType[],
  locations: LocationType[]
) {
  const filterAssets = assets
    .filter((asset) => asset.status === status)
    .map((asset) =>
      formatIntoTreeItem(determineAssetCategory(asset.sensorType), asset)
    )
    .map((asset) => findParents(asset, locations, assets));

  console.log(mergeObjectsById(filterAssets));
  return mergeObjectsById(filterAssets);
}
