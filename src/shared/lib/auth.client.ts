"use client";

import { useAuth, useUser } from "@clerk/nextjs";

export const useClientUser = () => {
  const { userId } = useAuth();
  const { user } = useUser();

  return {
    userId,
    user,
    email: user?.emailAddresses[0]?.emailAddress || null,
  };
};
