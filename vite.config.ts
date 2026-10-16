import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteMeta } from './scripts/vite-plugin-site-meta.ts'
import { site } from './src/config/site.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta(site)],
})
