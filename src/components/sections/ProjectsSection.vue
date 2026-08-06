<template>
  <section id="projects" class="section" aria-labelledby="projects-heading">
    <div class="container">
      <SectionHeading
        id="projects-heading"
        label="// projects"
        title="Projects"
        description="Four projects built during study and internship. All source code is available on GitHub."
      />

      <div class="projects-grid">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { projects } from '@/data/projects'
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
