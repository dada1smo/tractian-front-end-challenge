import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { determineAssetCategory, TreeItem } from '@/modules/utils/tree';
import { useState } from 'react';
import { findParents } from '@/modules/utils/find';
import { formatIntoTreeItem } from '@/modules/utils/format';

export default function useAssetFilter(
  tree: TreeItem[],
  locations: LocationType[],
  assets: AssetType[]
) {
  const [filteredTree, setFilteredTree] = useState<TreeItem[]>(tree);

  function handleFilterBySensorType(sensorType: 'energy' | 'vibration') {
    setFilteredTree(filterBySensorType(sensorType, assets, locations));
  }

  return { filteredTree, handleFilterBySensorType };
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

  return filterAssets;
}
