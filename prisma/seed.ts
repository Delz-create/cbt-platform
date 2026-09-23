import { db } from "../src/shared/db";

async function main() {
  const roleNames = ["SUPER_ADMIN", "ACADEMIC_ADMIN", "FINANCE_ADMIN", "SUPPORT_ADMIN", "STUDENT"];
  for (const name of roleNames) {
    await db.role.upsert({ where: { name }, update: {}, create: { name } });
  }

  const classLevels = [
    { name: "SS1", order: 1 },
    { name: "SS2", order: 2 },
    { name: "SS3", order: 3 },
  ];
  for (const cl of classLevels) {
    await db.classLevel.upsert({ where: { name: cl.name }, update: {}, create: cl });
  }

  console.log("Seeded roles and class levels.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));