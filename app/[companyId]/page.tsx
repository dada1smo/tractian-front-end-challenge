import { getAssets } from '@/modules/assets/services/asset.service';
import { getCompanies } from '@/modules/companies/services/company.service';
import AssetNavigation from '@/modules/global/components/AssetNavigation';
import { getLocations } from '@/modules/locations/services/location.service';
import {
  formatAssetsIntoTree,
  formatLocationsIntoTree,
} from '@/modules/utils/format';
import { buildTreeAsync, getRoot } from '@/modules/utils/tree';

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const companies = await getCompanies();
  const locations = await getLocations(companyId);
  const assets = await getAssets(companyId);

  const { root, childrenLocations, childrenAssets } = getRoot(
    locations,
    assets
  );
  const currentCompany = companies.filter(
    (company) => company.id === companyId
  )[0];

  const tree = await buildTreeAsync([
    ...formatLocationsIntoTree(locations),
    ...formatAssetsIntoTree(assets),
  ]);

  return (
    <div className="overflow-hidden h-full">
      <AssetNavigation
        tree={tree}
        rawLocations={locations}
        rawAssets={assets}
        childrenLocations={childrenLocations}
        childrenAssets={childrenAssets}
        company={currentCompany}
      />
    </div>
  );
}
