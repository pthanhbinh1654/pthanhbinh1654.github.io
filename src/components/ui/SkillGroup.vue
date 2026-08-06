<template>
  <div class="skill-group">
    <h3 class="skill-category text-muted font-mono">{{ group.category }}</h3>
    <ul class="skill-list" role="list">
      <li v-for="skill in group.skills" :key="skill.name" class="skill-item">
        <span class="skill-name">{{ skill.name }}</span>
        <span v-if="skill.note" class="skill-note text-muted">{{ skill.note }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { SkillGroup } from '@/data/skills'
defineProps<{ group: SkillGroup }>()
</script>

<style scoped>
.skill-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skill-category {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.skill-name {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text);
}

.skill-note {
  font-size: var(--text-xs);
  line-height: var(--leading-normal);
}
</style>
