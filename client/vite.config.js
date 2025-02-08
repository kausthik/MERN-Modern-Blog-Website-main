import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const URL = process.env.VITE_API_URL
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: URL,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
