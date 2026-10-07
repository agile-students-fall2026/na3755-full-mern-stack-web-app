import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgr({
        include: '**/*.svg?react',
      }),
    ],
    // overriding default build location for legacy create-react-app reasons in this project
    build: {
      outDir: 'build',
    },
    // open browser on start, like create-react-app did
    // open at port number specified in .env file
    server: {
      open: true,
      port: 7000, // Hardcoded to 7000 so it ignores the hidden .env file lock
      proxy: {
        // Automatically bridges the gap between your frontend port and backend port 5002
        '/about': {
          target: 'http://localhost:5002',
          changeOrigin: true,
        },
        '/pub': {
          target: 'http://localhost:5002',
          changeOrigin: true,
        }
      }
    }
  }
})
