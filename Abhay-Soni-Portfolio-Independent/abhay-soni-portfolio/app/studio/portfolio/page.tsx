import { redirect } from "next/navigation";
import { getAdminUser } from "../../../lib/admin";
import { getPortfolioItems } from "../../../lib/portfolio";
import { PortfolioEditor } from "./portfolio-editor";

export const dynamic = "force-dynamic";

type PortfolioKind = "skill" | "certificate" | "education" | "project";

export default async function PortfolioStudioPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const requestedSection = (await searchParams).section;
  const initialKind: PortfolioKind =
    requestedSection === "certificate" ||
    requestedSection === "education" ||
    requestedSection === "project"
      ? requestedSection
      : "skill";
  const adminUser = await getAdminUser();
  if (!adminUser) {
    redirect(
      `/login?returnTo=${encodeURIComponent(
        `/studio/portfolio?section=${initialKind}`,
      )}`,
    );
  }

  return (
    <PortfolioEditor
      initialKind={initialKind}
      initialItems={await getPortfolioItems()}
      userName={adminUser.fullName || "Abhay"}
    />
  );
}
