const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        cache: "no-store",

        headers: {
          "Content-Type":
            "application/json",
        },

        ...options,
      }
    );

    if (!response.ok) {
      throw new Error(
        "API request failed"
      );
    }

    return response.json();
  } catch (error) {
    console.error(error);

    return null;
  }
}