<template>
  <section id="about" class="section" aria-labelledby="about-heading">
    <div class="container">
      <SectionHeading
        id="about-heading"
        label="// about"
        title="Background"
        description="Information Security graduate with hands-on project experience in PKI, log monitoring, cryptography, and data engineering."
      />

      <div class="about-grid">
        <div class="about-text">
          <p>
            Completed a Bachelor of Information Security in 2026 at Can Tho University — College of Information and Communication Technology — with a GPA of 3.85/4.00 and the Academic Encouragement Scholarship for 6 consecutive semesters.
          </p>
          <p>
            During a data engineering internship at Mekosoft Software Solutions, developed dbt models for approximately 3 million records and built a Python/Jinja2 utility that later became the Kimball DimFact Builder project.
          </p>
          <p>
            Graduation thesis focused on building an internal PKI platform using HashiCorp Vault as the certificate authority and immudb for tamper-evident audit logging — both components selected based on their use in production security infrastructure.
          </p>
          <p>
            Seeking a first role as a SOC Analyst, Security Engineer, or PKI Engineer where I can apply the fundamentals built through these academic and internship projects.
          </p>
        </div>

        <div class="about-details">
          <div class="detail-group">
            <h3 class="detail-label text-muted font-mono">Relevant Coursework</h3>
            <ul class="detail-list" role="list">
              <li v-for="course in coursework" :key="course" class="detail-item">
                <CheckIcon :size="14" class="text-primary" aria-hidden="true" />
                <span>{{ course }}</span>
              </li>
            </ul>
          </div>

          <div class="detail-group">
            <h3 class="detail-label text-muted font-mono">Languages</h3>
            <ul class="detail-list" role="list">
              <li class="detail-item">
                <CheckIcon :size="14" class="text-primary" aria-hidden="true" />
                <span>Vietnamese — Native</span>
              </li>
              <li class="detail-item">
                <CheckIcon :size="14" class="text-primary" aria-hidden="true" />
                <span>English — Intermediate, technical documentation</span>
              </li>
            </ul>
          </div>

          <div class="detail-group">
            <h3 class="detail-label text-muted font-mono">Contact</h3>
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
import { Check as CheckIcon, Mail as MailIcon, Github as GithubIcon } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const coursework = [
  'Operating Systems',
  'Computer Networks',
  'Network Security',
  'Computer Forensics',
  'Cryptography',
]
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
