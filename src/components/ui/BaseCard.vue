<template>
  <div class="card" :class="{ 'card--hoverable': hoverable }">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ hoverable?: boolean }>(), { hoverable: false })
</script>

<style scoped>
.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-6);
}

.card--hoverable {
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition);
}

.card--hoverable:hover {
  border-color: rgba(56, 189, 248, 0.2);
  box-shadow: var(--shadow-primary);
  background: var(--color-card-hover);
}
</style>
