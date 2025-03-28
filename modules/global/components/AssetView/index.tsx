import { TreeItem } from '@/modules/utils/tree';
import { FunctionComponent, useMemo } from 'react';
import AssetStatusIcon from '../AssetStatusIcon';

interface AssetViewProps {
  selected: TreeItem | null;
}

const AssetView: FunctionComponent<AssetViewProps> = ({ selected }) => {
  const status = useMemo(() => {
    if (selected?.status) {
      return (
        <AssetStatusIcon
          status={selected.status}
          sensorType={selected?.sensorType}
        />
      );
    }
  }, [selected?.status, selected?.sensorType]);

  if (!selected) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-neutrals-600">Selecione um ativo para visualizar.</p>
      </div>
    );
  }

  return (
    <div className="border-b border-border-card py-3 px-3 flex gap-2 items-center">
      <h2 className="text-xl font-semibold">{selected.name}</h2>
      {status}
    </div>
  );
};

export default AssetView;
