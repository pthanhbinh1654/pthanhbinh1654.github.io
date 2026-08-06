<template>
  <section id="certifications" class="section" aria-labelledby="certs-heading">
    <div class="container">
      <SectionHeading
        id="certs-heading"
        label="// certifications"
        title="Certifications"
      />

      <div class="certs-grid">
        <CertBadge v-for="cert in certifications" :key="cert.name" :cert="cert" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import CertBadge from '@/components/ui/CertBadge.vue'
import { certifications } from '@/data/certifications'
</script>

<style scoped>
.certs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  max-width: 900px;
}

@media (max-width: 768px) {
  .certs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
