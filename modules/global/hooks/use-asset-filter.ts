import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { determineAssetCategory, TreeItem } from '@/modules/utils/tree';
import { useState } from 'react';
import { findAssetParent } from './filter';

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
  const filterAssets = assets.filter(
    (asset) => asset.sensorType === sensorType
  );
  const tree: TreeItem[] = [];

  filterAssets.forEach((asset) => {
    if (!asset.parentId && !asset.locationId) {
      tree.push({
        ...asset,
        category: 'component',
        children: [],
        lineage: [asset.id],
      });
    }

    if (asset.locationId) {
      const parents = findAssetParent(
        'location',
        {
          ...asset,
          category: determineAssetCategory(asset.sensorType),
          lineage: [asset.id],
          children: [],
        },
        locations
      );

      if (parents) {
        tree.push(parents);
      }
    }
  });

  return tree;
}
