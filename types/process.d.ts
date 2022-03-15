declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    MIGRATE_DATABASE_URL: string
    PRISMA_CLIENT_ENGINE_TYPE: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    GITHUB_ID: string
    GITHUB_SECRET: string
  }
}
