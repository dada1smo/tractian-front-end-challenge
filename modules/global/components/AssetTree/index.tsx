'use client';

import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { TreeItem } from '@/modules/utils/tree';
import UITreeItem from '@/ui/components/Tree/TreeItem';
import { FunctionComponent, useCallback, useMemo } from 'react';
import { TreeCategoryType } from '../../types/CategoryType';
import AssetTreeIcon from '../AssetTreeIcon';
import AssetStatusIcon from '../AssetStatusIcon';
import { UIButton } from '@/ui/components/Button';
import useAssetPagination from '../../hooks/use-asset-pagination';

interface AssetTreeProps {
  tree: TreeItem[];
  locations: LocationType[];
  assets: AssetType[];
  selectAsset: (asset: TreeItem) => void;
  selected: TreeItem | null;
  isFiltered?: boolean;
}

const AssetItem: FunctionComponent<{
  item: TreeItem;
  locations: LocationType[];
  assets: AssetType[];
  onOpenChange: (locationData: LocationType[], assetData: AssetType[]) => void;
  selectAsset: (asset: TreeItem) => void;
  selected: TreeItem | null;
  isFiltered?: boolean;
}> = ({
  item,
  locations,
  assets,
  onOpenChange,
  selectAsset,
  selected,
  isFiltered,
}) => {
  const handleSelectAsset = useCallback(
    (id: string, category: string) => {
      if (category !== 'location' && id === item.id) {
        selectAsset(item);
      }
    },
    [selectAsset, item]
  );

  const isSelected = useMemo(
    () => item.id === selected?.id,
    [item.id, selected]
  );

  const status = useMemo(() => {
    if (item.status) {
      return (
        <AssetStatusIcon status={item.status} sensorType={item.sensorType} />
      );
    }
  }, [item.status, item.sensorType]);

  const determineIcon = (category: TreeCategoryType, selected: boolean) => {
    return <AssetTreeIcon category={category} isSelected={selected} />;
  };

  const Tree = useMemo(
    () => (
      <AssetTree
        tree={item.children}
        locations={locations}
        assets={assets}
        selectAsset={selectAsset}
        selected={selected}
        isFiltered={isFiltered}
      />
    ),
    [item.children, locations, assets, selectAsset, selected, isFiltered]
  );

  return (
    <UITreeItem
      item={{
        ...item,
        onOpenChange: isFiltered
          ? undefined
          : () => onOpenChange(locations, assets),
        content: Tree,
        initial: isFiltered ? true : item.open,
        iconStart: determineIcon(item.category, isSelected),
        iconEnd: status,
        onSelectItem: handleSelectAsset,
        isSelected: isSelected,
      }}
    />
  );
};

const AssetTree: FunctionComponent<AssetTreeProps> = ({
  tree,
  locations,
  assets,
  selectAsset,
  selected,
  isFiltered,
}) => {
  const { currentTree, loadMore, hasMore, loadChildren } =
    useAssetPagination(tree);

  return (
    <div className="flex flex-col gap-1">
      {currentTree.map((item) => (
        <AssetItem
          key={item.id}
          item={item}
          locations={locations}
          assets={assets}
          onOpenChange={loadChildren}
          selectAsset={selectAsset}
          selected={selected}
          isFiltered={isFiltered}
        />
      ))}
      {hasMore && (
        <UIButton
          onClick={loadMore}
          size="slim"
          variant="ghost"
          icon={{ position: 'before', src: '/add.svg', size: 18 }}
        >
          Mostrar mais
        </UIButton>
      )}
    </div>
  );
};

export default AssetTree;
