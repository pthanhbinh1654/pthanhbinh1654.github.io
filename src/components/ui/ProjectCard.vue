<template>
  <article class="project-card hover-lift" role="article">
    <RouterLink :to="`/projects/${project.slug}`" class="card-link" :aria-label="`View ${project.title} details`">
      <div class="card-header">
        <div class="card-meta">
          <span class="card-period text-muted font-mono">{{ project.period }}</span>
          <span class="card-status" :class="`status--${project.status}`">
            {{ statusLabel }}
          </span>
        </div>
        <h3 class="card-title">{{ project.title }}</h3>
        <p class="card-tagline text-muted">{{ project.tagline }}</p>
      </div>

      <div class="card-tags">
        <BaseTag v-for="tag in project.tags.slice(0, 4)" :key="tag">{{ tag }}</BaseTag>
        <span v-if="project.tags.length > 4" class="tag-more text-muted">
          +{{ project.tags.length - 4 }}
        </span>
      </div>

      <div class="card-footer">
        <span class="card-cta text-primary">
          View details
          <ArrowRightIcon :size="14" aria-hidden="true" />
        </span>
        <a
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="card-github text-muted"
          aria-label="View source on GitHub (opens in new tab)"
          @click.stop
        >
          <GithubIcon :size="14" aria-hidden="true" />
          <span>Source</span>
        </a>
      </div>
    </RouterLink>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight as ArrowRightIcon, Github as GithubIcon } from 'lucide-vue-next'
import BaseTag from './BaseTag.vue'
import type { Project } from '@/data/projects'

const props = defineProps<{ project: Project }>()

const statusLabel = computed(() => {
  const map: Record<Project['status'], string> = {
    ready: 'Complete',
    partial: 'Partial',
    roadmap: 'Roadmap',
  }
  return map[props.project.status]
})
</script>

<style scoped>
.project-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition), transform var(--transition);
}

.project-card:hover {
  border-color: rgba(56, 189, 248, 0.2);
  box-shadow: var(--shadow-primary);
  background: var(--color-card-hover);
}

.card-link {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6);
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.card-period {
  font-size: var(--text-xs);
}

.card-status {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  padding: 2px var(--space-2);
  border-radius: 4px;
  font-family: var(--font-mono);
}

.status--ready {
  background: rgba(52, 211, 153, 0.1);
  color: var(--color-success);
}

.status--partial {
  background: rgba(251, 191, 36, 0.1);
  color: var(--color-warning);
}

.status--roadmap {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-muted);
}

.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: var(--leading-snug);
}

.card-tagline {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
  flex: 1;
}

.tag-more {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.card-cta {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.card-github {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.card-github:hover {
  color: var(--color-text);
  opacity: 1;
}
</style>
