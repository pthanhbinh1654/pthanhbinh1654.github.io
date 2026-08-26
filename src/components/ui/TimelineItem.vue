<template>
  <div class="timeline-item">
    <div class="timeline-marker" aria-hidden="true">
      <div class="timeline-dot" />
      <div class="timeline-line" />
    </div>
    <div class="timeline-content">
      <div class="timeline-header">
        <div>
          <h3 class="timeline-role">{{ role }}</h3>
          <p class="timeline-company">{{ company }}</p>
        </div>
        <div class="timeline-right">
          <span class="timeline-period text-muted font-mono">{{ period }}</span>
          <span v-if="badge" class="timeline-badge">{{ badge }}</span>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  role: string
  company: string
  period: string
  badge?: string
}>()
</script>

<style scoped>
.timeline-item {
  display: flex;
  gap: var(--space-5);
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 5px;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-primary);
  flex-shrink: 0;
}

.timeline-line {
  width: 1px;
  flex: 1;
  background: var(--color-border);
  margin-top: var(--space-2);
  min-height: 24px;
}

.timeline-content {
  flex: 1;
  padding-bottom: var(--space-10);
}

.timeline-item:last-child .timeline-line {
  display: none;
}

.timeline-item:last-child .timeline-content {
  padding-bottom: 0;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}

.timeline-role {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.timeline-company {
  font-size: var(--text-sm);
  color: var(--color-primary);
  margin-top: 2px;
}

.timeline-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
  flex-shrink: 0;
}

.timeline-period {
  font-size: var(--text-xs);
}

.timeline-badge {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  padding: 2px var(--space-2);
  background: var(--color-primary-dim);
  color: var(--color-primary);
  border-radius: 4px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  font-family: var(--font-mono);
}

@media (max-width: 560px) {
  .timeline-item {
    gap: var(--space-3);
  }

  .timeline-header {
    flex-direction: column;
    gap: var(--space-2);
  }

  .timeline-right {
    align-items: flex-start;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: var(--space-3);
  }
}
</style>
