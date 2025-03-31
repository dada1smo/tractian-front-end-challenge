import { TreeItem } from '@/modules/utils/tree';
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

  const hasMore = currentTree.length < initialData.length;

  return { currentTree, loadMore, hasMore };
}
