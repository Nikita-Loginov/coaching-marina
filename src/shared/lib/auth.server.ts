"use server";

import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export const getCurrentUser = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const client = await clerkClient();
  return client.users.getUser(userId);
};

export const getUserEmail = async () => {
  const user = await getCurrentUser();

  return user?.emailAddresses[0]?.emailAddress || null;
};
