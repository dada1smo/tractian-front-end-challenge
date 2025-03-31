import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { findChildren, TreeItem } from '@/modules/utils/tree';
import { useEffect, useState } from 'react';

export default function useAssetPagination(
  initialData: TreeItem[],
  initialCount = 24,
  increment = 24,
  isFiltered?: boolean
) {
  const [currentTree, setCurrentTree] = useState<TreeItem[]>(
    initialData.slice(0, initialCount)
  );

  useEffect(() => {
    setCurrentTree(initialData.slice(0, initialCount));
  }, [initialData, initialCount, isFiltered]);

  const loadMore = () => {
    const newCount = Math.min(
      currentTree.length + increment,
      initialData.length
    );

    setCurrentTree((prevTree) => {
      const showNext = initialData.slice(prevTree.length, newCount);
      return [...prevTree, ...showNext];
    });
  };

  const loadChildren = (
    locationData: LocationType[],
    assetData: AssetType[]
  ) => {
    setCurrentTree((prev) => {
      return prev.map((item) => ({
        ...item,
        children: item.children.map((child) => ({
          ...child,
          children: findChildren(
            locationData,
            assetData,
            child.id,
            child.id,
            child.lineage
          ),
        })),
      }));
    });
  };

  const hasMore = currentTree.length < initialData.length;

  return { currentTree, loadMore, hasMore, loadChildren };
}
