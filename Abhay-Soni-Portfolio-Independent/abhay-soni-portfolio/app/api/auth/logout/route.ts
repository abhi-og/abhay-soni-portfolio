import { expiredAdminSessionCookie } from "../../../../lib/auth";

function safeReturnPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  return new Response(null, {
    status: 303,
    headers: {
      location: new URL(
        safeReturnPath(url.searchParams.get("returnTo")),
        url.origin,
      ).toString(),
      "set-cookie": expiredAdminSessionCookie(),
    },
  });
}

export async function POST(request: Request) {
  return GET(request);
}
