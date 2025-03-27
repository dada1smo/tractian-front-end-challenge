'use client';

import { TreeItem } from '@/modules/utils/tree';
import { useState } from 'react';

export default function useAssetSelection() {
  const [selected, setSelected] = useState<TreeItem | null>(null);

  function selectAsset(asset: TreeItem) {
    setSelected(asset);
  }

  return { selected, selectAsset };
}
