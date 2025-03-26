import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { TreeItem } from '@/modules/utils/tree';
import { FunctionComponent } from 'react';
import AssetTree from '../AssetTree';
import UIScrollArea from '@/ui/components/ScrollArea';

interface AssetNavigationProps {
  initialTree: TreeItem[];
  locations: LocationType[];
  assets: AssetType[];
}

const AssetNavigation: FunctionComponent<AssetNavigationProps> = ({
  initialTree,
  locations,
  assets,
}) => {
  return (
    <div className="border border-border-card rounded overflow-hidden h-full">
      <UIScrollArea>
        <AssetTree
          initialTree={initialTree}
          locations={locations}
          assets={assets}
        />
      </UIScrollArea>
    </div>
  );
};

export default AssetNavigation;
