import { PrismaClient } from "@prisma/client"

declare global {
  var db: PrismaClient | undefined
}

export const db = global.db || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.db = db

export * from "@prisma/client"

export async function disconnect(): Promise<boolean> {
  await db.$disconnect()

  return true
}

export async function connect(): Promise<boolean> {
  await db.$connect()

  return true
}
