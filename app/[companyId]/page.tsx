import { getAssets } from '@/modules/assets/services/asset.service';
import AssetNavigation from '@/modules/global/components/AssetNavigation';
import { getLocations } from '@/modules/locations/services/location.service';
import { getRoot } from '@/modules/utils/tree';

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const locations = await getLocations(companyId);
  const assets = await getAssets(companyId);

  const tree = getRoot(locations, assets);

  return (
    <div className="grid grid-cols-12 grid-rows-1 gap-4 overflow-hidden h-full">
      <div className="overflow-hidden col-span-4">
        <AssetNavigation
          initialTree={tree}
          locations={locations}
          assets={assets}
        />
      </div>
    </div>
  );
}
