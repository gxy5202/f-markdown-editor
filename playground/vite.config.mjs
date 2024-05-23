// @ts-check
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/playground/',
  plugins: [
    vue(),
    svelte({
      preprocess: [sveltePreprocess({ typescript: true })],
    }),
  ],
})
