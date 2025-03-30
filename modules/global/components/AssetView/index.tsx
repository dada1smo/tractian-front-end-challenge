import { TreeItem } from '@/modules/utils/tree';
import { FunctionComponent, useMemo } from 'react';
import AssetStatusIcon from '../AssetStatusIcon';
import UIDataItem from '@/ui/components/DataItem';
import UIAvatar from '@/ui/components/Avatar';
import UIDivider from '@/ui/components/Divider';
import UIImageUpload from '@/ui/components/ImageUpload';
import useImageUpload from '@/ui/hooks/use-image-upload';

interface AssetViewProps {
  selected: TreeItem | null;
}

const AssetView: FunctionComponent<AssetViewProps> = ({ selected }) => {
  const { files, setFiles } = useImageUpload(selected?.id);

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

  const { equipment, responsible } = useMemo(
    () => determineSensorType(selected?.sensorType || ''),
    [selected?.sensorType]
  );

  if (!selected) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-neutrals-600">Selecione um ativo para visualizar.</p>
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-border-card py-3 px-3 flex gap-2 items-center">
        <h2 className="text-xl font-semibold">{selected.name}</h2>
        {status}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-6 py-4 px-8">
        <div className="row-span-1">
          <UIImageUpload files={files} setFiles={setFiles} />
        </div>
        <div className="flex flex-col py-8 gap-5">
          <div>
            <UIDataItem label="Tipo de Equipamento" content={equipment} />
          </div>
          <UIDivider className="mb-4" />
          <div>
            <UIDataItem
              label="Responsáveis"
              content={
                responsible ? (
                  <UIAvatar name={responsible} displayName />
                ) : (
                  'Nenhum'
                )
              }
            />
          </div>
        </div>
        <div className="col-span-2 row-start-2">
          <UIDivider className="mb-4" />
          <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div className="mt-6">
              <UIDataItem
                label="Sensor"
                iconStart="/sensor.svg"
                content={selected.sensorId}
              />
            </div>
            <div className="mt-6">
              <UIDataItem
                label="Receptor"
                iconStart="/receptor.svg"
                content={selected.gatewayId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetView;

function determineSensorType(sensorType?: string): {
  equipment: string;
  responsible: string;
} {
  if (sensorType === 'energy') {
    return { equipment: 'Energia', responsible: 'Elétrica' };
  }

  if (sensorType === 'vibration') {
    return { equipment: 'Vibração', responsible: 'Mecânica' };
  }

  return { equipment: 'Desconhecido', responsible: '' };
}
