import { currentUser } from "@clerk/nextjs/server";

import { apiFetch } from "./api";

export async function syncUser() {
  const user = await currentUser();

  if (!user) return null;

  return apiFetch(
    "/api/users/create",
    {
      method: "POST",

      body: JSON.stringify({
        clerkId: user.id,

        email:
          user.emailAddresses[0]
            .emailAddress,

        name: user.fullName,

        imageUrl:
          user.imageUrl,
      }),
    }
  );
}