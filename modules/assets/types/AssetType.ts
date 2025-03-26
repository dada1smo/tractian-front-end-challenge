export interface AssetType {
  id: string;
  name: string;
  locationId?: string | null;
  parentId?: string | null;
  sensorId?: string | null;
  sensorType?: string | null;
  status?: string | null;
  gatewayId?: string | null;
}
