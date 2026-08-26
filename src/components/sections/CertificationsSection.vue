<template>
  <section id="certifications" class="section" aria-labelledby="certs-heading">
    <div class="container">
      <SectionHeading
        id="certs-heading"
        :label="t.certifications.label"
        :title="t.certifications.title"
      />

      <div class="certs-grid">
        <CertBadge v-for="cert in certList" :key="cert.name" :cert="cert" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import CertBadge from '@/components/ui/CertBadge.vue'
import { getCertifications } from '@/data/certifications'
import { useLocale } from '@/i18n/useLocale'

const { t, locale } = useLocale()
const certList = computed(() => getCertifications(locale.value))
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
