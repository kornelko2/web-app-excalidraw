import { defineConfig } from 'vite'
import veauryVitePlugins from 'veaury/vite/index.js'
import { createRoot } from 'react-dom/client'
import { join } from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        excalidraw: './src/index.ts',
      },
      output: {
        entryFileNames: 'excalidraw.js',
        format: 'amd',
        dir: 'dist',
        chunkFileNames: join('js', 'chunks', '[name]-[hash].mjs'),
      },
      external: [
        'vue',
        'vue3-gettext',
        'vue-router',
        'pinia',
        '@ownclouders/web-pkg',
        '@ownclouders/web-client',
      ],
      preserveEntrySignatures: 'strict',
    },
  },
  plugins: [
    veauryVitePlugins({
      type: 'vue',
      vueOptions: { customElement: false },
      reactOptions: { createRoot },
    }),
  ],
})
