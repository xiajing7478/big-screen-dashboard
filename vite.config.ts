import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署时需要设置 base 为仓库名路径
  // 本地开发时通过环境变量 VITE_APP_BASE 不设置（默认为 '/'）
  base: process.env.VITE_APP_BASE ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
