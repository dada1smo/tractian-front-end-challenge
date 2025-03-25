import { tractianApi } from '@/modules/tractian.api';
import { CompanyType } from '../types/CompanyType';

export async function getCompanies(): Promise<CompanyType[]> {
  const data = await fetch(tractianApi('/companies'));
  const companies = await data.json();

  return companies;
}
