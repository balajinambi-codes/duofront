import { apiFetch } from "./api";

export async function getProgress(
  userId: string
) {
  try {
    return await apiFetch(
      `/api/progress/${userId}`
    );
  } catch (error) {
    console.error(error);

    return [];
  }
}