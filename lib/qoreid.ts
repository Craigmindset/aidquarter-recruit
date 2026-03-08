let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getQoreIdToken(): Promise<string> {
  const now = Date.now();
  const envToken = process.env.QOREID_ACCESS_TOKEN;
  if (envToken) {
    const envExpSec = Number(
      process.env.QOREID_ACCESS_TOKEN_EXPIRES_IN || 3600,
    );
    const tokenOnly = envToken.startsWith("Bearer ")
      ? envToken.slice(7)
      : envToken;
    cachedToken = { token: tokenOnly, expiresAt: now + envExpSec * 1000 };
    return tokenOnly;
  }
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.token;
  }
  const clientId = process.env.QOREID_CLIENT_ID;
  const clientSecret = process.env.QOREID_CLIENT_SECRET;
  const tokenUrl =
    process.env.QOREID_TOKEN_URL || "https://api.qoreid.com/token";
  if (!clientId || !clientSecret) {
    throw new Error("QoreID not configured");
  }
  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ clientId, secret: clientSecret }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to obtain QoreID token");
  }
  let accessToken = "";
  let expiresInMs = 3600 * 1000;
  try {
    const data: any = await res.json();
    accessToken = data.accessToken || data.token || "";
    const expiresIn = Number(data.expiresIn || 3600);
    expiresInMs = isNaN(expiresIn) ? 3600 * 1000 : expiresIn * 1000;
  } catch {
    const text = await res.text();
    try {
      const parsed: any = JSON.parse(text);
      accessToken = parsed.accessToken || parsed.token || "";
      const expiresIn = Number(parsed.expiresIn || 3600);
      expiresInMs = isNaN(expiresIn) ? 3600 * 1000 : expiresIn * 1000;
    } catch {
      accessToken = text.trim();
    }
  }
  if (!accessToken) {
    throw new Error("Invalid token response");
  }
  const tokenOnly = accessToken.startsWith("Bearer ")
    ? accessToken.slice(7)
    : accessToken;
  cachedToken = { token: tokenOnly, expiresAt: now + expiresInMs };
  return tokenOnly;
}
