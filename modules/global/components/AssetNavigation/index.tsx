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
import AssetNameFilter from '../AssetNameFilter';

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
  const {
    filteredTree,
    handleFilterBySensorType,
    filterType,
    handleFilterByStatus,
    handleFilterByName,
    clearFilters,
  } = useAssetFilter(tree, rawLocations, rawAssets);
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
        <div className="flex gap-2">
          <UIButton
            variant={filterType === 'sensor' ? 'default' : 'outline'}
            onClick={() => handleFilterBySensorType('energy')}
            className={
              filterType === 'sensor' ? 'pointer-events-none cursor-auto' : ''
            }
            icon={{
              position: 'before',
              size: 20,
              src:
                filterType === 'sensor'
                  ? '/energy-sensor-filter-white.svg'
                  : '/energy-sensor-filter.svg',
            }}
          >
            Sensor de Energia
          </UIButton>
          <UIButton
            variant={filterType === 'status' ? 'default' : 'outline'}
            onClick={() => handleFilterByStatus('alert')}
            className={
              filterType === 'status' ? 'pointer-events-none cursor-auto' : ''
            }
            icon={{
              position: 'before',
              size: 20,
              src:
                filterType === 'status'
                  ? '/alert-status-filter-white.svg'
                  : '/alert-status-filter.svg',
            }}
          >
            Crítico
          </UIButton>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 overflow-hidden h-full grow">
        <div className="overflow-hidden col-span-4">
          <div className="border border-border-card rounded-xs overflow-hidden h-full flex flex-col">
            <AssetNameFilter
              handleFilterByName={handleFilterByName}
              clearFilters={clearFilters}
            />
            <div className="overflow-y-auto h-full py-2 px-3 border-t border-border-card">
              {filterType !== 'none' && (
                <AssetTree
                  tree={filteredTree}
                  locations={childrenLocations}
                  assets={childrenAssets}
                  selectAsset={selectAsset}
                  selected={selected}
                  isFiltered={true}
                />
              )}
              {filterType === 'none' && (
                <AssetTree
                  tree={tree}
                  locations={childrenLocations}
                  assets={childrenAssets}
                  selectAsset={selectAsset}
                  selected={selected}
                  isFiltered={false}
                />
              )}
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
