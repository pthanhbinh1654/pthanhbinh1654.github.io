<template>
  <section id="skills" class="section" aria-labelledby="skills-heading">
    <div class="container">
      <SectionHeading
        id="skills-heading"
        label="// skills"
        title="Technical Skills"
        description="Skills demonstrated through projects and internship. Grouped by domain."
      />

      <div class="skills-grid">
        <BaseCard v-for="group in skillGroups" :key="group.category">
          <SkillGroup :group="group" />
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import SkillGroup from '@/components/ui/SkillGroup.vue'
import { skillGroups } from '@/data/skills'
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
