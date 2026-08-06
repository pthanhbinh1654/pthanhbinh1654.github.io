<template>
  <div class="app-layout">
    <AppHeader />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

main {
  flex: 1;
  padding-top: var(--nav-height);
}

main:focus {
  outline: none;
}
</style>
