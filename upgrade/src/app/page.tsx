import UpgradePanel from "~/app/upgrade-panel";
import { getT3VersionsGroupedByMajor } from "~/lib/utils";

export default async function Page() {
  const t3Versions = await getT3VersionsGroupedByMajor();

  return <UpgradePanel versionOptions={t3Versions} />;
}
