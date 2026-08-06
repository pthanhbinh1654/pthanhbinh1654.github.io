<template>
  <AppLayout>
    <HeroSection />
    <hr class="divider container" />
    <AboutSection />
    <hr class="divider container" />
    <ProjectsSection />
    <hr class="divider container" />
    <SkillsSection />
    <hr class="divider container" />
    <ExperienceSection />
    <hr class="divider container" />
    <EducationSection />
    <hr class="divider container" />
    <CertificationsSection />
    <hr class="divider container" />
    <WritingSection />
    <hr class="divider container" />
    <ContactSection />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import EducationSection from '@/components/sections/EducationSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import WritingSection from '@/components/sections/WritingSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'

useSeoMeta({
  title: 'Phan Thanh Binh — Information Security Portfolio',
  description:
    'Information Security graduate from Can Tho University. Projects in PKI, Windows log collection, zero-knowledge encryption, and data engineering.',
})
</script>
