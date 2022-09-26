import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPath from 'vite-tsconfig-paths'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react(), tsConfigPath()],
  server: {
    host: true,
    open: false,
  },
})
