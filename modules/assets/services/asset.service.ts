import { tractianApi } from '@/modules/tractian.api';
import { AssetType } from '../types/AssetType';

export async function getAssets(companyId: string): Promise<AssetType[]> {
  const data = await fetch(tractianApi(`/companies/${companyId}/assets`));
  const assets = await data.json();

  return assets;
}
