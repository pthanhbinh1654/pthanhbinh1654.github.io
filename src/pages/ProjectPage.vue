<template>
  <AppLayout>
    <div v-if="project" class="project-page">
      <!-- Back -->
      <div class="container project-back">
        <RouterLink to="/#projects" class="back-link">
          <ArrowLeftIcon :size="16" aria-hidden="true" />
          <span>All Projects</span>
        </RouterLink>
      </div>

      <!-- Header -->
      <header class="project-hero" aria-labelledby="project-heading">
        <div class="container">
          <div class="project-meta-top">
            <span class="meta-period text-muted font-mono">{{ project.period }}</span>
            <span class="meta-status" :class="`status--${project.status}`">{{ statusLabel }}</span>
          </div>
          <h1 id="project-heading" class="project-title">{{ project.title }}</h1>
          <p class="project-tagline text-muted">{{ project.tagline }}</p>
          <div class="project-tags">
            <BaseTag v-for="tag in project.tags" :key="tag" variant="primary">{{ tag }}</BaseTag>
          </div>
          <div class="project-cta">
            <BaseButton :href="project.github" variant="primary" external aria-label="View source code on GitHub">
              <GithubIcon :size="16" aria-hidden="true" />
              Source Code
            </BaseButton>
            <BaseButton v-if="project.docs" :href="project.docs" variant="secondary" external aria-label="View documentation">
              <FileTextIcon :size="16" aria-hidden="true" />
              Documentation
            </BaseButton>
            <BaseButton v-if="project.demo" :href="project.demo" variant="secondary" external aria-label="View live demo">
              <ExternalLinkIcon :size="16" aria-hidden="true" />
              Demo
            </BaseButton>
          </div>
        </div>
      </header>

      <div class="container project-body">
        <!-- Overview -->
        <Section title="Overview" icon="info">
          <p class="prose text-muted">{{ project.overview }}</p>
        </Section>

        <!-- Problem -->
        <Section title="Problem Statement" icon="alert">
          <p class="prose text-muted">{{ project.problem }}</p>
        </Section>

        <!-- Architecture -->
        <Section title="Architecture">
          <div class="arch-block">
            <pre class="arch-diagram font-mono"><code>{{ project.architecture }}</code></pre>
          </div>
        </Section>

        <!-- Tech Stack -->
        <Section title="Technology Stack">
          <div class="table-wrapper">
            <table class="tech-table" aria-label="Technology stack">
              <thead>
                <tr>
                  <th scope="col">Layer</th>
                  <th scope="col">Technology</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in project.techStack" :key="row.layer">
                  <td class="font-mono">{{ row.layer }}</td>
                  <td>{{ row.tech }}</td>
                  <td class="text-muted">{{ row.detail }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <!-- My Contribution -->
        <Section title="My Contribution">
          <ul class="prose-list" role="list">
            <li v-for="item in project.contribution" :key="item" class="prose-item">
              <span class="item-dot text-primary" aria-hidden="true">—</span>
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </Section>

        <!-- Implementation Details -->
        <Section title="Implementation Details">
          <ul class="prose-list" role="list">
            <li v-for="item in project.implementation" :key="item" class="prose-item">
              <span class="item-dot text-primary" aria-hidden="true">—</span>
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </Section>

        <!-- Security Considerations -->
        <Section title="Security Considerations">
          <ul class="prose-list" role="list">
            <li v-for="item in project.security" :key="item" class="prose-item">
              <ShieldIcon :size="14" class="text-primary item-icon" aria-hidden="true" />
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </Section>

        <!-- Challenges -->
        <Section title="Challenges">
          <ul class="prose-list" role="list">
            <li v-for="item in project.challenges" :key="item" class="prose-item">
              <span class="item-dot text-muted" aria-hidden="true">—</span>
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </Section>

        <!-- Lessons Learned -->
        <Section title="Lessons Learned">
          <ul class="prose-list" role="list">
            <li v-for="item in project.lessonsLearned" :key="item" class="prose-item">
              <span class="item-dot text-primary" aria-hidden="true">—</span>
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </Section>

        <!-- Limitations -->
        <Section title="Limitations">
          <ul class="prose-list" role="list">
            <li v-for="item in project.limitations" :key="item" class="prose-item">
              <span class="item-dot text-muted" aria-hidden="true">—</span>
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </Section>

        <!-- Future Work -->
        <Section title="Future Work">
          <ul class="prose-list" role="list">
            <li v-for="item in project.futureWork" :key="item" class="prose-item">
              <span class="item-dot text-primary" aria-hidden="true">—</span>
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </Section>

        <!-- Links -->
        <Section title="Repository & Resources">
          <div class="resource-links">
            <a :href="project.github" target="_blank" rel="noopener noreferrer" class="resource-link" aria-label="View source code on GitHub (opens in new tab)">
              <GithubIcon :size="16" aria-hidden="true" />
              <span>Source Code — GitHub</span>
              <ExternalLinkIcon :size="12" aria-hidden="true" class="text-muted" />
            </a>
            <a v-if="project.docs" :href="project.docs" target="_blank" rel="noopener noreferrer" class="resource-link" aria-label="View documentation (opens in new tab)">
              <FileTextIcon :size="16" aria-hidden="true" />
              <span>Documentation</span>
              <ExternalLinkIcon :size="12" aria-hidden="true" class="text-muted" />
            </a>
            <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="resource-link" aria-label="View demo (opens in new tab)">
              <ExternalLinkIcon :size="16" aria-hidden="true" />
              <span>Demo</span>
            </a>
          </div>
        </Section>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="not-found container">
      <h1>Project not found</h1>
      <RouterLink to="/" class="back-link">
        <ArrowLeftIcon :size="16" aria-hidden="true" />
        Return home
      </RouterLink>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import {
  ArrowLeft as ArrowLeftIcon,
  Github as GithubIcon,
  FileText as FileTextIcon,
  ExternalLink as ExternalLinkIcon,
  Shield as ShieldIcon,
} from 'lucide-vue-next'
import AppLayout from '@/components/layout/AppLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import { useSeoMeta } from '@/composables/useSeoMeta'

// Internal section component
const Section = defineComponent({
  props: { title: { type: String, required: true }, icon: String },
  setup(props, { slots }) {
    return () =>
      h('section', { class: 'project-section', 'aria-labelledby': `section-${props.title.replace(/\s+/g, '-').toLowerCase()}` }, [
        h('h2', { id: `section-${props.title.replace(/\s+/g, '-').toLowerCase()}`, class: 'section-title' }, props.title),
        h('div', { class: 'section-body' }, slots.default?.()),
      ])
  },
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const project = computed<Project | undefined>(() => projects.find((p) => p.slug === slug.value))

const statusLabel = computed(() => {
  if (!project.value) return ''
  const map: Record<Project['status'], string> = { ready: 'Complete', partial: 'Partial', roadmap: 'Roadmap' }
  return map[project.value.status]
})

// SEO
useSeoMeta({
  title: project.value
    ? `${project.value.title} — Phan Thanh Binh`
    : 'Project — Phan Thanh Binh',
  description: project.value?.tagline ?? 'Project details',
})
</script>

<style scoped>
.project-page {
  padding-bottom: var(--space-20);
}

.project-back {
  padding-top: var(--space-8);
  padding-bottom: 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-muted);
  text-decoration: none;
  padding: var(--space-2) 0;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-text);
  opacity: 1;
}

.project-hero {
  padding-block: var(--space-12);
  border-bottom: 1px solid var(--color-border);
}

.project-meta-top {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.meta-period {
  font-size: var(--text-xs);
}

.meta-status {
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

.project-title {
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
  font-weight: var(--font-bold);
  letter-spacing: -0.02em;
  color: var(--color-text);
  line-height: 1.1;
}

.project-tagline {
  font-size: var(--text-lg);
  margin-top: var(--space-4);
  max-width: 60ch;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-5);
}

.project-cta {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-6);
  flex-wrap: wrap;
}

.project-body {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: var(--space-10);
}

/* Section styling */
:deep(.project-section) {
  padding-block: var(--space-10);
  border-bottom: 1px solid var(--color-border);
}

:deep(.project-section:last-child) {
  border-bottom: none;
}

:deep(.section-title) {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-5);
}

:deep(.section-body) {
  max-width: 800px;
}

/* Prose */
.prose {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

.prose-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.prose-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

.item-dot {
  flex-shrink: 0;
  font-weight: var(--font-bold);
  margin-top: 2px;
}

.item-icon {
  flex-shrink: 0;
  margin-top: 3px;
}

/* Architecture block */
.arch-block {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-6);
  overflow-x: auto;
}

.arch-diagram {
  font-size: var(--text-xs);
  color: var(--color-muted);
  line-height: 1.6;
  white-space: pre;
}

/* Tech table */
.table-wrapper {
  overflow-x: auto;
}

.tech-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.tech-table th {
  text-align: left;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-muted);
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--color-border);
}

.tech-table td {
  padding: var(--space-3) var(--space-4);
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

.tech-table tbody tr:last-child td {
  border-bottom: none;
}

.tech-table tbody tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

/* Resource links */
.resource-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.resource-link:hover {
  opacity: 0.8;
}

/* Not found */
.not-found {
  padding-block: var(--space-24);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
</style>
