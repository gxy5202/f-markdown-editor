<template>
  <div id="markdown" ref="contentRef"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import markdownText from './text.md?raw'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import { Editor } from 'bytemd'
import 'bytemd/dist/index.css'
import 'github-markdown-css'
import 'highlight.js/styles/vs.css'
// placed after highlight styles to override `code` padding
import 'katex/dist/katex.css'

function stripPrefixes(obj: Record<string, any>) {
  return Object.entries(obj).reduce((p, [key, value]) => {
    p[key.split('/').slice(-1)[0].replace('.json', '')] = value
    // console.log(p)
    return p
  }, {} as Record<string, any>)
}

const locales = stripPrefixes(
  import.meta.glob('/node_modules/bytemd/locales/*.json', { eager: true })
)
const gfmLocales = stripPrefixes(
  import.meta.glob('/node_modules/@bytemd/plugin-gfm/src/locales/*.json', {
    eager: true,
  })
)
const mathLocales = stripPrefixes(
  import.meta.glob('/node_modules/@bytemd/plugin-math/src/locales/*.json', {
    eager: true,
  })
)
const mermaidLocales = stripPrefixes(
  import.meta.glob('/node_modules/@bytemd/plugin-mermaid/src/locales/*.json', {
    eager: true,
  })
)

const contentRef = ref('');
onMounted(() => {
  const editor = new Editor({
    target: contentRef.value!,
    props: {
      value: markdownText,
      plugins: [
        gfm(),
        highlight()
      ],
      locale: 'zh_Hans',
      uploadImages: (files) => {
        return Promise.all(
          files.map((file) => {
            // TODO:
            return {
              url: 'https://picsum.photos/300',
            }
          })
        )
      }
    }
  })
editor.$on('change', (e) => {
  editor.$set({ value: e.detail.value })
})
  // editor.$on('change', (e) => {
  //   emit('change', e.detail.value)
  // })

})

</script>
<style scoped>
#markdown {
  width: 100%;
  height: 100%;
}
</style>