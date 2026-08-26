<template>
  <section id="writing" class="section" aria-labelledby="writing-heading">
    <div class="container">
      <SectionHeading
        id="writing-heading"
        :label="t.writing.label"
        :title="t.writing.title"
        :description="t.writing.description"
      />

      <div class="writing-list">
        <a
          v-for="item in writingList"
          :key="item.title"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="writing-item hover-lift"
          :aria-label="`${item.title} — opens on GitHub in new tab`"
        >
          <div class="writing-type" :class="`type--${item.type}`">
            <FileTextIcon :size="14" aria-hidden="true" />
            <span>{{ typeLabel(item.type) }}</span>
          </div>
          <h3 class="writing-title">{{ item.title }}</h3>
          <p class="writing-desc text-muted">{{ item.description }}</p>
          <div class="writing-footer">
            <GithubIcon :size="14" aria-hidden="true" class="text-muted" />
            <span class="text-muted writing-link font-mono">GitHub</span>
            <ExternalLinkIcon :size="12" aria-hidden="true" class="text-muted" />
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FileText as FileTextIcon, Github as GithubIcon, ExternalLink as ExternalLinkIcon } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { getWritingItems, type WritingItem } from '@/data/writing'
import { useLocale } from '@/i18n/useLocale'

const { t, locale } = useLocale()
const writingList = computed(() => getWritingItems(locale.value))

function typeLabel(type: WritingItem['type']): string {
  const map: Record<WritingItem['type'], string> = {
    readme: t.value.writing.typeReadme,
    runbook: t.value.writing.typeRunbook,
    guide: t.value.writing.typeGuide,
  }
  return map[type]
}
</script>

<style scoped>
.writing-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
}

.writing-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition), transform var(--transition);
  cursor: pointer;
}

.writing-item:hover {
  border-color: rgba(56, 189, 248, 0.2);
  box-shadow: var(--shadow-primary);
  background: var(--color-card-hover);
  opacity: 1;
}

.writing-type {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  font-family: var(--font-mono);
  padding: 2px var(--space-2);
  border-radius: 4px;
  align-self: flex-start;
}

.type--readme {
  background: rgba(56, 189, 248, 0.1);
  color: var(--color-primary);
}

.type--runbook {
  background: rgba(52, 211, 153, 0.1);
  color: var(--color-success);
}

.type--guide {
  background: rgba(251, 191, 36, 0.1);
  color: var(--color-warning);
}

.writing-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  line-height: var(--leading-snug);
}

.writing-desc {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  flex: 1;
}

.writing-footer {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: auto;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
}

.writing-link {
  font-size: var(--text-xs);
}

@media (max-width: 768px) {
  .writing-list {
    grid-template-columns: 1fr;
  }
}
</style>
