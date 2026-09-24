import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/shared/db";
import { authRequired, forbidden } from "@/shared/errors";

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw authRequired();
  return user;
}

export async function requireRole(roleName: string) {
  const user = await requireAuth();
  const hasRole = await db.userRole.findFirst({
    where: { userId: user.id, role: { name: roleName } },
  });
  if (!hasRole) throw forbidden(`Requires ${roleName} role`);
  return user;
}

export async function requirePermission(permissionKey: string) {
  const user = await requireAuth();
  const hasPermission = await db.userRole.findFirst({
    where: {
      userId: user.id,
      role: { permissions: { some: { permission: { key: permissionKey } } } },
    },
  });
  if (!hasPermission) throw forbidden(`Requires permission: ${permissionKey}`);
  return user;
}