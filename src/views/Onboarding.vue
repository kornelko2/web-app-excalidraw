<template>
  <div class="onboarding">
    <h1 class="title">Excalidraw</h1>
    <p class="body">
      Open or create a <strong>.excalidraw</strong> file in the Files app to start editing.
    </p>
    <p class="body">
      You can create one from <strong>Files - New - Excalidraw Whiteboard</strong>.
    </p>
  </div>
</template>

<style scoped>
.onboarding {
  display: flex;
  min-height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem;
  text-align: center;
}

.title {
  margin: 0;
  font-size: 2rem;
}

.body {
  margin: 0;
  max-width: 42rem;
  font-size: 1rem;
}
</style>
