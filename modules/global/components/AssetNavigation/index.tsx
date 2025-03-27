'use client';

import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { TreeItem } from '@/modules/utils/tree';
import { FunctionComponent } from 'react';
import AssetTree from '../AssetTree';
import useAssetSelection from '../../hooks/use-asset-selection';

interface AssetNavigationProps {
  tree: TreeItem[];
  locations: LocationType[];
  assets: AssetType[];
}

const AssetNavigation: FunctionComponent<AssetNavigationProps> = ({
  tree,
  locations,
  assets,
}) => {
  const { selectAsset, selected } = useAssetSelection();

  return (
    <div className="border border-border-card rounded overflow-y-auto h-full py-2 px-3">
      <AssetTree
        tree={tree}
        locations={locations}
        assets={assets}
        selectAsset={selectAsset}
        selected={selected}
      />
    </div>
  );
};

export default AssetNavigation;
