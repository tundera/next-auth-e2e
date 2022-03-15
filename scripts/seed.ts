/* eslint-disable no-console */
import faker from "@faker-js/faker"
import task from "tasuku"

import { db } from "src/server/db"
import { getErrorMessage } from "src/lib/error"

const runSeedTasks = async () => {
  await task("Seed tasks", async ({ task }) => {
    await task.group((task) => [
      task("Seeding users", async () => {
        for (let i = 1; i <= 100; i += 1) {
          await db.user.create({
            data: {
              id: i.toString(),
              name: faker.name.findName(),
              email: faker.internet.email(),
              emailVerified: faker.date.past(),
              image: faker.image.avatar(),
            },
          })
        }
      }),
      task("Seeding accounts", async () => {
        for (let i = 1; i <= 100; i += 1) {
          await db.account.create({
            data: {
              id: i.toString(),
              userId: faker.datatype.number({ min: 1, max: 100 }).toString(),
              provider: faker.random.arrayElement([
                "facebook",
                "google",
                "github",
                "email",
              ]),
              providerAccountId: faker.datatype.uuid(),
              type: faker.random.arrayElement(["oauth", "email"]),
            },
          })
        }
      }),
      task("Seeding sessions", async () => {
        for (let i = 1; i <= 100; i += 1) {
          await db.session.create({
            data: {
              id: i.toString(),
              userId: faker.datatype.number({ min: 1, max: 100 }).toString(),
              expires: faker.date.future(),
              sessionToken: faker.random.alphaNumeric(32),
            },
          })
        }
      }),
    ])
  })
}

async function main() {
  const { default: nextDotenv } = await import("@next/env")
  nextDotenv.loadEnvConfig(process.cwd())

  try {
    await runSeedTasks()
  } catch (err) {
    console.warn("Please define your seed data.")
    throw new Error(`Failed to generate Prisma schema: ${getErrorMessage(err)}`)
  }
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
    process.exit(0)
  })
