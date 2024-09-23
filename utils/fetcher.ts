import Token from "@/types/Token";

export default async function fetcher(
  url: string,
  method: string = "GET",
  body: string | undefined = undefined,
  token: Token
): Promise<any> {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const data = await res.json();

  return data;
}
