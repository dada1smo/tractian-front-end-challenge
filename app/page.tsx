import CompanyMenu from '@/modules/companies/components/CompanyMenu';
import { getCompanies } from '@/modules/companies/services/company.service';
import UIImage from '@/ui/components/Image';

export default async function HomePage() {
  const companies = await getCompanies();

  return (
    <div className="h-dvh w-dvw overflow-hidden flex flex-col items-center justify-center gap-8">
      <UIImage src="/tractian.svg" alt="Tractian" width={200} priority />
      <CompanyMenu companies={companies} />
    </div>
  );
}
