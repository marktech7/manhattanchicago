import { defineConfig } from 'vite'

export default defineConfig({
  root: '.', // Set root to current directory
  publicDir: 'public', // Public directory for static assets
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        chatbot: './public/chatbot.html'
      }
    }
  }
})