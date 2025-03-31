import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import {
  determineAssetCategory,
  findAllChildren,
  TreeItem,
} from '@/modules/utils/tree';
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
    setFilteredTree(filterBySensorType(sensorType, assets, locations));
  }

  function handleFilterByStatus(status: 'alert' | 'operating') {
    setFilterType('status');
    setFilteredTree(filterByStatus(status, assets, locations));
  }

  function handleFilterByName(category: 'location' | 'asset', name: string) {
    setFilterType('name');
    if (category === 'location') {
      setFilteredTree(filterLocationByName(name, assets, locations));
    }
    if (category === 'asset') {
      setFilteredTree(filterAssetByName(name, assets, locations));
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
  assets: AssetType[],
  locations: LocationType[]
) {
  const filterAssets = assets
    .filter((asset) => asset.sensorType === sensorType)
    .map((asset) =>
      formatIntoTreeItem(determineAssetCategory(asset.sensorType), asset)
    )
    .map((asset) => findParents(asset, locations, assets));

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

  return mergeObjectsById(filterAssets);
}

function filterAssetByName(
  name: string,
  assets: AssetType[],
  locations: LocationType[]
) {
  const filterAssets = assets
    .filter((asset) =>
      asset.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    )
    .map((asset) =>
      formatIntoTreeItem(determineAssetCategory(asset.sensorType), asset)
    )
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

  return mergeObjectsById(filterAssets);
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
