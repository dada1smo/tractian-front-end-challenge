'use client';

import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { TreeItem } from '@/modules/utils/tree';
import { FunctionComponent } from 'react';
import AssetTree from '../AssetTree';
import useAssetSelection from '../../hooks/use-asset-selection';
import { CompanyType } from '@/modules/companies/types/CompanyType';
import AssetView from '../AssetView';
import useAssetFilter from '../../hooks/use-asset-filter';
import { UIButton } from '@/ui/components/Button';

interface AssetNavigationProps {
  tree: TreeItem[];
  rawLocations: LocationType[];
  rawAssets: AssetType[];
  childrenLocations: LocationType[];
  childrenAssets: AssetType[];
  company: CompanyType;
}

const AssetNavigation: FunctionComponent<AssetNavigationProps> = ({
  tree,
  rawLocations,
  rawAssets,
  childrenAssets,
  childrenLocations,
  company,
}) => {
  const { filteredTree, handleFilterBySensorType } = useAssetFilter(
    tree,
    rawLocations,
    rawAssets
  );
  const { selectAsset, selected } = useAssetSelection();

  return (
    <div className="h-full overflow-hidden flex flex-col gap-2">
      <div className="flex items-center pt-1 pb-2 justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Ativos</h1>
          <p className="text-md font-regular text-neutrals-600">
            / {`${company.name} Unit`}
          </p>
        </div>
        <UIButton onClick={() => handleFilterBySensorType('energy')}>
          Sensor de Energia
        </UIButton>
      </div>
      <div className="grid grid-cols-12 gap-4 overflow-hidden h-full grow">
        <div className="overflow-hidden col-span-4">
          <div className="border border-border-card rounded-xs overflow-hidden h-full">
            <div className="overflow-y-auto h-full py-2 px-3">
              <AssetTree
                tree={filteredTree}
                locations={childrenLocations}
                assets={childrenAssets}
                selectAsset={selectAsset}
                selected={selected}
              />
            </div>
          </div>
        </div>
        <div className="col-span-8 col-start-5 overflow-hidden">
          <div className="border border-border-card rounded-xs overflow-hidden h-full">
            <AssetView selected={selected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetNavigation;
