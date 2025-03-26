'use client';

import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { findChildren, TreeItem } from '@/modules/utils/tree';
import UITreeItem from '@/ui/components/Tree/TreeItem';
import { FunctionComponent, useState } from 'react';

interface AssetTreeProps {
  initialTree: TreeItem[];
  locations: LocationType[];
  assets: AssetType[];
}

const AssetItem: FunctionComponent<{
  item: TreeItem;
  locations: LocationType[];
  assets: AssetType[];
  onOpenChange: (locationData: LocationType[], assetData: AssetType[]) => void;
}> = ({ item, locations, assets, onOpenChange }) => {
  return (
    <UITreeItem
      item={{
        ...item,
        onOpenChange: () => onOpenChange(locations, assets),
        content: (
          <AssetTree
            initialTree={item.children}
            locations={locations}
            assets={assets}
          />
        ),
      }}
    />
  );
};

const AssetTree: FunctionComponent<AssetTreeProps> = ({
  initialTree,
  locations,
  assets,
}) => {
  const [currentTree, setCurrentTree] = useState<TreeItem[]>(initialTree);

  const onOpenChange = (
    locationData: LocationType[],
    assetData: AssetType[]
  ) => {
    setCurrentTree((prev) => {
      return prev.map((item) => ({
        ...item,
        children: item.children.map((child) => ({
          ...child,
          children: findChildren(locationData, assetData, child.id, child.id),
        })),
      }));
    });
  };

  return (
    <div className="flex flex-col gap-1">
      {currentTree.map((item) => (
        <AssetItem
          key={item.id}
          item={item}
          locations={locations}
          assets={assets}
          onOpenChange={onOpenChange}
        />
      ))}
    </div>
  );
};

export default AssetTree;
