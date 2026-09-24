import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/shared/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            const [firstName, ...rest] = user.name.split(" ");
            const lastName = rest.join(" ") || firstName;
            const studentId = `STU${new Date().getFullYear()}${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

            await db.studentProfile.create({
              data: { userId: user.id, studentId, firstName, lastName },
            });

            const studentRole = await db.role.findUnique({ where: { name: "STUDENT" } });
            if (studentRole) {
              await db.userRole.create({
                data: { userId: user.id, roleId: studentRole.id },
              });
            } else {
              console.error("[auth hook] STUDENT role not found — did the seed script run?");
            }
          } catch (err) {
            console.error("[auth hook] failed for user", user.id, err);
          }
        },
      },
    },
  },
});