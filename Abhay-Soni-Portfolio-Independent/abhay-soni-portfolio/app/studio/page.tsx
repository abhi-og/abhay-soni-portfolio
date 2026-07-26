import { redirect } from "next/navigation";
import { getAdminUser } from "../../lib/admin";
import { getAllPosts } from "../../lib/posts";
import { StudioClient } from "./studio-client";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const adminUser = await getAdminUser();
  if (!adminUser) redirect("/login?returnTo=%2Fstudio");

  const initialPosts = await getAllPosts();

  return (
    <StudioClient
      initialPosts={initialPosts}
      userName={adminUser.fullName || "Abhay"}
      signOutPath="/api/auth/logout?returnTo=%2F"
    />
  );
}
