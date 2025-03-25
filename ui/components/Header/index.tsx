import { FunctionComponent } from 'react';
import UIImage from '../Image';
import { getCompanies } from '@/modules/companies/services/company.service';
import CompanyMenu from '@/modules/companies/components/CompanyMenu';

const UIHeader: FunctionComponent = async () => {
  const companies = await getCompanies();

  return (
    <header className="w-full bg-header-background px-4 py-3 flex justify-between">
      <UIImage src="/tractian-white.svg" alt="Tractian" width={104} priority />
      <CompanyMenu companies={companies} />
    </header>
  );
};

export default UIHeader;
