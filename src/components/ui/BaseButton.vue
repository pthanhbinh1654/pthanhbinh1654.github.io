<template>
  <button
    v-if="!href"
    :class="['btn', `btn--${variant}`, { 'btn--icon': icon }]"
    v-bind="$attrs"
  >
    <slot />
  </button>
  <a
    v-else
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="['btn', `btn--${variant}`, { 'btn--icon': icon }]"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  external?: boolean
  icon?: boolean
}>()

defineOptions({ inheritAttrs: false })
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: background var(--transition-fast), color var(--transition-fast),
    border-color var(--transition-fast), box-shadow var(--transition-fast);
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-bg);
  border-color: var(--color-primary);
}

.btn--primary:hover {
  background: color-mix(in srgb, var(--color-primary) 85%, white);
  opacity: 1;
}

.btn--secondary {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn--secondary:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
  opacity: 1;
}

.btn--ghost {
  background: transparent;
  color: var(--color-muted);
  border-color: transparent;
}

.btn--ghost:hover {
  color: var(--color-text);
  opacity: 1;
}

.btn--icon {
  padding: var(--space-2);
}
</style>
