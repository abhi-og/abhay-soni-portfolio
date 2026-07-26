import {
  adminSessionCookie,
  createAdminSession,
  validateAdminCredentials,
} from "../../../../lib/auth";

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  let payload: LoginPayload;
  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return Response.json({ error: "Invalid login request." }, { status: 400 });
  }

  const email = payload.email?.trim() ?? "";
  const password = payload.password ?? "";
  if (!email || !password || !(await validateAdminCredentials(email, password))) {
    return Response.json(
      { error: "Email or password is incorrect." },
      { status: 401 },
    );
  }

  const token = await createAdminSession(email);
  return Response.json(
    { ok: true },
    { headers: { "set-cookie": adminSessionCookie(token) } },
  );
}
