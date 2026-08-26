<template>
  <section id="about" class="section" aria-labelledby="about-heading">
    <div class="container">
      <SectionHeading
        id="about-heading"
        :label="t.about.label"
        :title="t.about.title"
        :description="t.about.description"
      />

      <div class="about-grid">
        <div class="about-text">
          <p>{{ t.about.p1 }}</p>
          <p>{{ t.about.p2 }}</p>
          <p>{{ t.about.p3 }}</p>
          <p>{{ t.about.p4 }}</p>
        </div>

        <div class="about-details">
          <div class="detail-group">
            <h3 class="detail-label text-muted font-mono">{{ t.about.courseworkLabel }}</h3>
            <ul class="detail-list" role="list">
              <li v-for="course in coursework" :key="course" class="detail-item">
                <CheckIcon :size="14" class="text-primary" aria-hidden="true" />
                <span>{{ course }}</span>
              </li>
            </ul>
          </div>

          <div class="detail-group">
            <h3 class="detail-label text-muted font-mono">{{ t.about.languagesLabel }}</h3>
            <ul class="detail-list" role="list">
              <li class="detail-item">
                <CheckIcon :size="14" class="text-primary" aria-hidden="true" />
                <span>{{ t.about.langVi }}</span>
              </li>
              <li class="detail-item">
                <CheckIcon :size="14" class="text-primary" aria-hidden="true" />
                <span>{{ t.about.langEn }}</span>
              </li>
            </ul>
          </div>

          <div class="detail-group">
            <h3 class="detail-label text-muted font-mono">{{ t.about.contactLabel }}</h3>
            <ul class="detail-list" role="list">
              <li class="detail-item">
                <MailIcon :size="14" class="text-primary" aria-hidden="true" />
                <a href="mailto:pthanhbinh2654@gmail.com" class="detail-link">pthanhbinh2654@gmail.com</a>
              </li>
              <li class="detail-item">
                <GithubIcon :size="14" class="text-primary" aria-hidden="true" />
                <a href="https://github.com/pthanhbinh1654" target="_blank" rel="noopener noreferrer" class="detail-link">github.com/pthanhbinh1654</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Check as CheckIcon, Mail as MailIcon, Github as GithubIcon } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useLocale } from '@/i18n/useLocale'

const { t, locale } = useLocale()

const coursework = computed(() => {
  if (locale.value === 'vi') {
    return [
      'Hệ điều hành',
      'Mạng máy tính',
      'An toàn mạng',
      'Điều tra số (Computer Forensics)',
      'Mật mã học',
    ]
  }
  return [
    'Operating Systems',
    'Computer Networks',
    'Network Security',
    'Computer Forensics',
    'Cryptography',
  ]
})
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: start;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  color: var(--color-muted);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

.about-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.detail-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.detail-label {
  font-size: var(--text-xs);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--color-border);
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text);
}

.detail-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: var(--text-sm);
}

.detail-link:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
