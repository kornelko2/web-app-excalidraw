<template>
  <div class="wrapper">
    <!-- eslint-disable vue/attribute-hyphenation -->
    <ExcalidrawComponent
      :theme="theme"
      :initialData="initialData"
      :onChange="onChange"
      :UIOptions="uiOptions"
    >
      <!-- eslint-enable vue/attribute-hyphenation -->
      <WelcomeScreen />
    </ExcalidrawComponent>
  </div>
</template>

<script setup lang="ts">
import { Excalidraw, THEME } from '@excalidraw/excalidraw'
import '@excalidraw/excalidraw/index.css'
import { applyPureReactInVue } from 'veaury'
import { type AppConfigObject, useThemeStore } from '@ownclouders/web-pkg'
import { storeToRefs } from 'pinia'
import { computed, unref } from 'vue'
import WelcomeScreen from '../components/WelcomeScreen.vue'
import { type Resource } from '@ownclouders/web-client'

const props = defineProps<{
  resource: Resource
  currentContent: string
  applicationConfig: AppConfigObject
}>()
const emit = defineEmits<{ 'update:currentContent': [string] }>()

const assetsPath = props.applicationConfig.assetsPath

const initialData = {
  elements: props.currentContent === '' ? [] : JSON.parse(props.currentContent),
}

const uiOptions = Object.freeze({
  canvasActions: {
    loadScene: false,
    export: false,
    saveToActiveFile: false,
    toggleTheme: false,
    saveAsImage: false,
    changeViewBackgroundColor: false,
  },
})

const ExcalidrawComponent = applyPureReactInVue(Excalidraw)

const themeStore = useThemeStore()
const { currentTheme } = storeToRefs(themeStore)

const theme = computed(() =>
  unref(currentTheme).isDark ? THEME.DARK : THEME.LIGHT
)

const onChange = (elements: unknown[]) => {
  if (elements.length === 0) {
    emit('update:currentContent', '')
    return
  }

  emit('update:currentContent', JSON.stringify(elements))
}

if (typeof assetsPath === 'string' && assetsPath !== '') {
  window.EXCALIDRAW_ASSET_PATH = assetsPath
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
}
</style>
