const API_URL = "https://duocode-r8ff.onrender.com";

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
      },

      ...options,
    }
  );

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}