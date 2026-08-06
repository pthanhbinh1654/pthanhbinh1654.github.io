<template>
  <span class="tag" :class="`tag--${variant}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'default' | 'primary' }>(), { variant: 'default' })
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  font-family: var(--font-mono);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.tag--default {
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
}

.tag--primary {
  background: var(--color-primary-dim);
  color: var(--color-primary);
  border: 1px solid rgba(56, 189, 248, 0.2);
}
</style>
