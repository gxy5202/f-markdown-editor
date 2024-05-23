<template>
  <div id="markdown" ref="contentRef"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import markdownText from './text.md?raw'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Editor } from 'f-markdown-editor'
import 'f-markdown-editor/dist/index.css'
import 'highlight.js/styles/vs.css'
// placed after highlight styles to override `code` padding

const contentRef = ref('');
onMounted(() => {
  const editor = new Editor({
    target: contentRef.value!,
    props: {
      value: markdownText,
      previewMode: 'preview',
      icons: [],
      plugins: [
        gfm({
          locale: {
            "strike": "删除线",
            "table": "表格",
            "task": "任务列表",
          }
        }),
        highlight()
      ],
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

  console.log(editor.dipatch);
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