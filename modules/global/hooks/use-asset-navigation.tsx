'use client';

import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { findChildren, TreeItem } from '@/modules/utils/tree';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useAssetNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = searchParams.get('selected');

  function selectAsset(assetLineageId: string) {
    router.push(`${pathname}?selected=${assetLineageId}`);
  }

  const handleInitialTree = useCallback(
    (
      tree: TreeItem[],
      locations: LocationType[],
      assets: AssetType[]
    ): TreeItem[] => {
      if (!selected) {
        console.log(tree);
        return tree;
      }

      return tree.map((item) => {
        if (selected.includes(item.id)) {
          return {
            ...item,
            open: true,
            selected:
              item.lineage.reverse().toString().replaceAll(',', '-') ===
              selected,
            children: handleInitialTree(
              item.children.map((child) => {
                return {
                  ...child,
                  children: findChildren(
                    locations,
                    assets,
                    child.id,
                    child.id,
                    child.lineage
                  ),
                };
              }),
              locations,
              assets
            ),
          };
        }

        return item;
      });
    },
    [selected]
  );

  return {
    selected,
    selectAsset,
    handleInitialTree,
  };
}
