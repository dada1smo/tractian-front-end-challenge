import { getAssets } from '@/modules/assets/services/asset.service';
import AssetTree from '@/modules/global/components/AssetTree';
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
    <div className="overflow-y-auto h-full">
      <AssetTree initialTree={tree} locations={locations} assets={assets} />
    </div>
  );
}
