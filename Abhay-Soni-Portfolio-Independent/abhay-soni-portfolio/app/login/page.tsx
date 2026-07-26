import { redirect } from "next/navigation";
import { getAdminUser } from "../../lib/auth";
import { LoginClient } from "./login-client";

export const dynamic = "force-dynamic";

function safeReturnPath(value: string | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/studio";
  return value;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const returnTo = safeReturnPath((await searchParams).returnTo);
  if (await getAdminUser()) redirect(returnTo);
  return <LoginClient returnTo={returnTo} />;
}
