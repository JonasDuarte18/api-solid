import { defineConfig } from 'prisma/config'
// import { env as envSrc } from './src/env/index.js'

export default defineConfig({
  schema: 'prisma/schema.prisma',

  migrations: {
    path: 'prisma/migrations',
  },
})
