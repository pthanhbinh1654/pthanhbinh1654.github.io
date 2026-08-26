<template>
  <section id="experience" class="section" aria-labelledby="experience-heading">
    <div class="container">
      <SectionHeading
        id="experience-heading"
        :label="t.experience.label"
        :title="t.experience.title"
      />

      <div class="timeline">
        <TimelineItem
          v-for="exp in experienceList"
          :key="exp.company + exp.period"
          :role="exp.role"
          :company="exp.company"
          :period="exp.period"
          :badge="exp.type === 'internship' ? t.experience.internshipBadge : undefined"
        >
          <ul class="exp-list" role="list">
            <li v-for="item in exp.responsibilities" :key="item" class="exp-item">
              <span class="exp-bullet text-primary" aria-hidden="true">—</span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <div class="exp-tech">
            <BaseTag v-for="tech in exp.technologies" :key="tech">{{ tech }}</BaseTag>
          </div>
        </TimelineItem>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TimelineItem from '@/components/ui/TimelineItem.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import { getExperiences } from '@/data/experience'
import { useLocale } from '@/i18n/useLocale'

const { t, locale } = useLocale()
const experienceList = computed(() => getExperiences(locale.value))
</script>

<style scoped>
.timeline {
  max-width: 800px;
}

.exp-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.exp-item {
  display: flex;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: var(--leading-relaxed);
}

.exp-bullet {
  flex-shrink: 0;
  font-weight: var(--font-bold);
  margin-top: 1px;
}

.exp-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}
</style>
