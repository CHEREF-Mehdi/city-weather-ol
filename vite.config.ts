import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'city-weather-ol',
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
