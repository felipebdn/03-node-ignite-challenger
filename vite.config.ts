import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    target: 'es2020',
  },
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
  },
})
