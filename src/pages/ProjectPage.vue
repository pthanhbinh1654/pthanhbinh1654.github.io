<template>
  <AppLayout>
    <div v-if="project" class="project-page">
      <!-- Back -->
      <div class="container project-back">
        <RouterLink to="/#projects" class="back-link">
          <ArrowLeftIcon :size="16" aria-hidden="true" />
          <span>{{ t.projectDetail.allProjects }}</span>
        </RouterLink>
      </div>

      <!-- Header -->
      <header class="project-hero" aria-labelledby="project-heading">
        <div class="container">
          <div class="project-meta-top">
            <span class="meta-period text-muted font-mono">{{ project.period }}</span>
            <span v-if="project.category" class="meta-category font-mono">{{ project.category }}</span>
            <span class="meta-status" :class="`status--${project.status}`">{{ statusLabel }}</span>
          </div>
          <h1 id="project-heading" class="project-title">{{ project.title }}</h1>
          <p class="project-tagline text-muted">{{ project.tagline }}</p>
          <div class="project-tags">
            <BaseTag v-for="tag in project.tags" :key="tag" variant="primary">{{ tag }}</BaseTag>
          </div>
          <div class="project-cta">
            <BaseButton :href="project.github" variant="primary" external :aria-label="t.projectDetail.sourceCode">
              <GithubIcon :size="16" aria-hidden="true" />
              {{ t.projectDetail.sourceCode }}
            </BaseButton>
            <BaseButton v-if="project.docs" :href="project.docs" variant="secondary" external :aria-label="t.projectDetail.documentation">
              <FileTextIcon :size="16" aria-hidden="true" />
              {{ t.projectDetail.documentation }}
            </BaseButton>
            <BaseButton v-if="project.demo" :href="project.demo" variant="secondary" external :aria-label="t.projectDetail.demo">
              <ExternalLinkIcon :size="16" aria-hidden="true" />
              {{ t.projectDetail.demo }}
            </BaseButton>
          </div>
        </div>
      </header>

      <div class="container project-body">
        <!-- Overview -->
        <Section :title="t.projectDetail.secOverview" icon="info">
          <p class="prose text-muted">{{ project.overview }}</p>
        </Section>

        <!-- Problem -->
        <Section :title="t.projectDetail.secProblem" icon="alert">
          <p class="prose text-muted">{{ project.problem }}</p>
        </Section>

        <!-- Architecture -->
        <Section :title="t.projectDetail.secArchitecture">
          <div class="arch-block">
            <pre class="arch-diagram font-mono"><code>{{ project.architecture }}</code></pre>
          </div>
        </Section>

        <!-- Tech Stack -->
        <Section :title="t.projectDetail.secTechStack">
          <div class="table-wrapper">
            <table class="tech-table" :aria-label="t.projectDetail.secTechStack">
              <thead>
                <tr>
                  <th scope="col">{{ t.projectDetail.thLayer }}</th>
                  <th scope="col">{{ t.projectDetail.thTechnology }}</th>
                  <th scope="col">{{ t.projectDetail.thDetail }}</th>
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
        <Section :title="t.projectDetail.secContribution">
          <ul class="prose-list" role="list">
            <li v-for="item in project.contribution" :key="item" class="prose-item">
              <span class="item-dot text-primary" aria-hidden="true">—</span>
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </Section>

        <!-- Implementation Details -->
        <Section :title="t.projectDetail.secImplementation">
          <ul class="prose-list" role="list">
            <li v-for="item in project.implementation" :key="item" class="prose-item">
              <span class="item-dot text-primary" aria-hidden="true">—</span>
              <span class="text-muted">{{ item }}</span>
            </li>
          </ul>
        </Section>

        <!-- Security Considerations -->
        <Section :title="t.projectDetail.secSecurity">
          <div class="security-box">
            <div class="security-header">
              <ShieldIcon :size="16" class="text-primary" aria-hidden="true" />
              <span class="font-mono text-sm">{{ t.projectDetail.secSecurity }}</span>
            </div>
            <ul class="prose-list" role="list">
              <li v-for="item in project.security" :key="item" class="prose-item">
                <span class="item-dot text-primary" aria-hidden="true">—</span>
                <span class="text-muted">{{ item }}</span>
              </li>
            </ul>
          </div>
        </Section>

        <!-- Challenges & Lessons -->
        <div class="two-col-sections">
          <Section :title="t.projectDetail.secChallenges">
            <ul class="prose-list" role="list">
              <li v-for="item in project.challenges" :key="item" class="prose-item">
                <span class="item-dot text-primary" aria-hidden="true">—</span>
                <span class="text-muted">{{ item }}</span>
              </li>
            </ul>
          </Section>

          <Section :title="t.projectDetail.secLessons">
            <ul class="prose-list" role="list">
              <li v-for="item in project.lessonsLearned" :key="item" class="prose-item">
                <span class="item-dot text-primary" aria-hidden="true">—</span>
                <span class="text-muted">{{ item }}</span>
              </li>
            </ul>
          </Section>
        </div>

        <!-- Limitations & Future Work -->
        <div class="two-col-sections">
          <Section :title="t.projectDetail.secLimitations">
            <ul class="prose-list" role="list">
              <li v-for="item in project.limitations" :key="item" class="prose-item">
                <span class="item-dot text-primary" aria-hidden="true">—</span>
                <span class="text-muted">{{ item }}</span>
              </li>
            </ul>
          </Section>

          <Section :title="t.projectDetail.secFutureWork">
            <ul class="prose-list" role="list">
              <li v-for="item in project.futureWork" :key="item" class="prose-item">
                <span class="item-dot text-primary" aria-hidden="true">—</span>
                <span class="text-muted">{{ item }}</span>
              </li>
            </ul>
          </Section>
        </div>

        <!-- Resources -->
        <Section :title="t.projectDetail.secResources">
          <div class="resource-links">
            <a :href="project.github" target="_blank" rel="noopener noreferrer" class="resource-link">
              <GithubIcon :size="16" aria-hidden="true" />
              <span>GitHub: {{ project.slug }}</span>
              <ExternalLinkIcon :size="12" aria-hidden="true" />
            </a>
          </div>
        </Section>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="not-found container">
      <h1>{{ t.projectDetail.notFound }}</h1>
      <RouterLink to="/" class="back-link">
        <ArrowLeftIcon :size="16" aria-hidden="true" />
        {{ t.projectDetail.returnHome }}
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
import { getProjectBySlug, type Project } from '@/data/projects'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { useLocale } from '@/i18n/useLocale'

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
const { t, locale } = useLocale()
const slug = computed(() => route.params.slug as string)
const project = computed<Project | undefined>(() => getProjectBySlug(slug.value, locale.value))

const statusLabel = computed(() => {
  if (!project.value) return ''
  const map: Record<Project['status'], string> = {
    ready: t.value.projects.statusReady,
    partial: t.value.projects.statusPartial,
    roadmap: t.value.projects.statusRoadmap,
  }
  return map[project.value.status]
})

// SEO
const metaTitle = computed(() =>
  project.value
    ? `${project.value.title} — ${locale.value === 'vi' ? 'Phan Thanh Bình' : 'Phan Thanh Binh'}`
    : `Project — ${locale.value === 'vi' ? 'Phan Thanh Bình' : 'Phan Thanh Binh'}`
)

const metaDescription = computed(() => project.value?.tagline ?? 'Project details')

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
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
  flex-wrap: wrap;
}

.meta-period {
  font-size: var(--text-xs);
}

.meta-category {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  padding: 2px var(--space-2);
  border-radius: 4px;
  background: rgba(56, 189, 248, 0.08);
  color: var(--color-primary);
  border: 1px solid rgba(56, 189, 248, 0.2);
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

.status--roadmap {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-muted);
}

.project-title {
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
  font-weight: var(--font-bold);
  letter-spacing: -0.02em;
  color: var(--color-text);
  line-height: 1.1;
}

.project-tagline {
  font-size: clamp(var(--text-base), 2vw, var(--text-lg));
  margin-top: var(--space-3);
  max-width: 65ch;
  line-height: var(--leading-relaxed);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-6);
}

.project-cta {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-8);
  flex-wrap: wrap;
}

.project-body {
  padding-top: var(--space-12);
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  max-width: 860px;
}

:deep(.project-section) {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

:deep(.section-title) {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.prose {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

.arch-block {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-6);
  overflow-x: auto;
}

.arch-diagram {
  font-size: var(--text-xs);
  color: var(--color-text);
  line-height: 1.6;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.tech-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.tech-table th,
.tech-table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.tech-table th {
  background: rgba(255, 255, 255, 0.03);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted);
}

.tech-table tr:last-child td {
  border-bottom: none;
}

.tech-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.prose-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.prose-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

.item-dot {
  flex-shrink: 0;
  font-weight: var(--font-bold);
  margin-top: 1px;
}

.item-icon {
  flex-shrink: 0;
  margin-top: 5px;
}

.resource-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.resource-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--color-text);
  font-size: var(--text-sm);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.resource-link:hover {
  border-color: rgba(56, 189, 248, 0.2);
  box-shadow: var(--shadow-primary);
  opacity: 1;
}

.not-found {
  padding-block: var(--space-20);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
}

@media (max-width: 640px) {
  .project-hero {
    padding-block: var(--space-8);
  }

  .project-body {
    padding-top: var(--space-8);
    gap: var(--space-8);
  }

  .project-cta {
    flex-direction: column;
  }

  .project-cta .btn {
    width: 100%;
    justify-content: center;
  }

  .arch-block {
    padding: var(--space-4);
  }

  .arch-diagram {
    font-size: 11px;
  }
}
</style>
