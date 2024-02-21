"use server";

import { auth } from "@/auth";

export async function authenticated<TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      ...config.headers,
    },
    ...config,
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }
  if (response.headers.get("Content-Type")?.startsWith("application/json")) {
    const data = response.json();
    return data as Promise<TResponse>;
  }
  if (response.headers.get("Content-Type")?.startsWith("text/plain")) {
    const data = response.text();
    return data as Promise<TResponse>;
  }
  throw new Error("Unsupported content type");
}
