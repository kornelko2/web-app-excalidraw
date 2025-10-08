<template>
  <WelcomeScreenComponent>
    <WelcomeScreenToolbarHintComponent />
    <WelcomeScreenMenuHintComponent />
    <WelcomeScreenCenterComponent>
      <WelcomeScreenLogoComponent />
    </WelcomeScreenCenterComponent>
    <WelcomeScreenHelpHintComponent />
  </WelcomeScreenComponent>
</template>

<script setup lang="ts">
import { WelcomeScreen } from '@excalidraw/excalidraw'
import { applyPureReactInVue } from 'veaury'

const WelcomeScreenComponent = applyPureReactInVue(WelcomeScreen)
const WelcomeScreenCenterComponent = applyPureReactInVue(WelcomeScreen.Center)
const WelcomeScreenLogoComponent = applyPureReactInVue(
  WelcomeScreen.Center.Logo
)
const WelcomeScreenToolbarHintComponent = applyPureReactInVue(
  WelcomeScreen.Hints.ToolbarHint
)
const WelcomeScreenMenuHintComponent = applyPureReactInVue(
  WelcomeScreen.Hints.MenuHint
)
const WelcomeScreenHelpHintComponent = applyPureReactInVue(
  WelcomeScreen.Hints.HelpHint
)
</script>
