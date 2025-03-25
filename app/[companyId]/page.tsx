import { getLocations } from '@/modules/locations/services/location.service';
import { buildTree } from '@/modules/utils/tree';

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const locations = await getLocations(companyId);

  const locationTree = buildTree(locations);

  console.log(locationTree);
  return <div>Company Page</div>;
}
