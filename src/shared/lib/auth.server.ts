import { getAdminSession } from "./admin-session";

export const getUserEmail = async () => {
  const session = await getAdminSession();

  return session?.email ?? null;
};
