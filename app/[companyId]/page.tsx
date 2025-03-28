import { getAssets } from '@/modules/assets/services/asset.service';
import { getCompanies } from '@/modules/companies/services/company.service';
import AssetNavigation from '@/modules/global/components/AssetNavigation';
import { getLocations } from '@/modules/locations/services/location.service';
import { getRoot } from '@/modules/utils/tree';

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const companies = await getCompanies();
  const locations = await getLocations(companyId);
  const assets = await getAssets(companyId);

  const { root, childrenLocation, childrenAsset } = getRoot(locations, assets);
  const currentCompany = companies.filter(
    (company) => company.id === companyId
  )[0];

  return (
    <div className="overflow-hidden h-full">
      <AssetNavigation
        tree={root}
        locations={childrenLocation}
        assets={childrenAsset}
        company={currentCompany}
      />
    </div>
  );
}
