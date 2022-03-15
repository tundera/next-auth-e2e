#!/usr/bin/env node

import { execa } from "execa"

import { getErrorMessage } from "src/lib/error"

async function main() {
  try {
    await execa("pnpm", ["prisma", "generate"], {
      stdio: "inherit",
      env: {
        NODE_ENV: "production",
        DATABASE_URL: process.env.DATABASE_URL,
        MIGRATE_DATABASE_URL: process.env.MIGRATE_DATABASE_URL,
        PRISMA_CLIENT_ENGINE_TYPE: process.env.PRISMA_CLIENT_ENGINE_TYPE,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_URL,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
      },
    })
  } catch (err) {
    throw new Error(`Failed to generate Prisma schema: ${getErrorMessage(err)}`)
  }

  try {
    await execa("pnpm", ["prisma", "migrate", "deploy"], {
      stdio: "inherit",
      env: {
        NODE_ENV: "production",
        DATABASE_URL: process.env.MIGRATE_DATABASE_URL, // Using migrate database URL here
        MIGRATE_DATABASE_URL: process.env.MIGRATE_DATABASE_URL,
        PRISMA_CLIENT_ENGINE_TYPE: process.env.PRISMA_CLIENT_ENGINE_TYPE,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_URL,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
      },
    })
  } catch (err) {
    throw new Error(`Failed to migrate Prisma schema: ${getErrorMessage(err)}`)
  }

  try {
    await execa("pnpm", ["next", "build"], {
      stdio: "inherit",
      env: {
        NODE_ENV: "production",
        DATABASE_URL: process.env.DATABASE_URL,
        MIGRATE_DATABASE_URL: process.env.MIGRATE_DATABASE_URL,
        PRISMA_CLIENT_ENGINE_TYPE: process.env.PRISMA_CLIENT_ENGINE_TYPE,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_URL,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
      },
    })
  } catch (err) {
    throw new Error(
      `Failed to build Next.js application: ${getErrorMessage(err)}`
    )
  }
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
