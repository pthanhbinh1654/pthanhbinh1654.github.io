<template>
  <div class="section-heading">
    <p v-if="label" class="section-label font-mono text-primary">{{ label }}</p>
    <component :is="level" class="section-title">{{ title }}</component>
    <p v-if="description" class="section-description text-muted">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  label?: string
  description?: string
  level?: 'h2' | 'h3'
}>(), { level: 'h2' })
</script>

<style scoped>
.section-heading {
  margin-bottom: var(--space-12);
}

.section-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.section-title {
  font-size: clamp(var(--text-2xl), 4vw, var(--text-4xl));
  font-weight: var(--font-bold);
  color: var(--color-text);
  line-height: var(--leading-tight);
}

.section-description {
  margin-top: var(--space-4);
  font-size: var(--text-lg);
  max-width: 56ch;
  line-height: var(--leading-relaxed);
}
</style>
