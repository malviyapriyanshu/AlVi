import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Trigger reload
export default defineConfig({
  plugins: [react()],
  base: '/AlVi/',
})
