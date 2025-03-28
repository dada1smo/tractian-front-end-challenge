export type AssetStatusType = 'operating' | 'alert';

export interface AssetType {
  id: string;
  name: string;
  locationId?: string | null;
  parentId?: string | null;
  sensorId?: string | null;
  sensorType?: string | null;
  status?: AssetStatusType | null;
  gatewayId?: string | null;
}
