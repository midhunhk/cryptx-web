import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // https://vitejs.dev/config/build-options.html#build-outdir
  build:{
    outDir:'docs'
  }
})
