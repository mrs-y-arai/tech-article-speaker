export async function fetchHelper<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not set");
  }

  const response = await fetch(`${baseUrl}${url}`, options);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const responseJson = await response.json();

  return responseJson;
}
