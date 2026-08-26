<template>
  <section id="projects" class="section" aria-labelledby="projects-heading">
    <div class="container">
      <SectionHeading
        id="projects-heading"
        :label="t.projects.label"
        :title="t.projects.title"
        :description="t.projects.description"
      />

      <div class="projects-grid">
        <ProjectCard v-for="project in projectList" :key="project.slug" :project="project" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { getProjects } from '@/data/projects'
import { useLocale } from '@/i18n/useLocale'

const { t, locale } = useLocale()
const projectList = computed(() => getProjects(locale.value))
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
