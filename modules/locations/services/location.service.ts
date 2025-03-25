import { tractianApi } from '@/modules/tractian.api';
import { LocationType } from '../types/LocationType';

export async function getLocations(companyId: string): Promise<LocationType[]> {
  const data = await fetch(tractianApi(`/companies/${companyId}/locations`));
  const locations = await data.json();

  return locations;
}
