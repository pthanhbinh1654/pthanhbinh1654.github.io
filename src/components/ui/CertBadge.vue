<template>
  <div class="cert-badge">
    <div class="cert-icon" aria-hidden="true">
      <AwardIcon :size="20" />
    </div>
    <div class="cert-info">
      <p class="cert-name">{{ cert.name }}</p>
      <p class="cert-issuer text-muted">{{ cert.issuer }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Award as AwardIcon } from 'lucide-vue-next'
import type { Certification } from '@/data/certifications'
defineProps<{ cert: Certification }>()
</script>

<style scoped>
.cert-badge {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.cert-badge:hover {
  border-color: rgba(56, 189, 248, 0.2);
  box-shadow: var(--shadow-primary);
}

.cert-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-primary-dim);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.cert-name {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: var(--leading-snug);
}

.cert-issuer {
  font-size: var(--text-xs);
  margin-top: 2px;
}
</style>
