<template>
  <section id="education" class="section" aria-labelledby="education-heading">
    <div class="container">
      <SectionHeading
        id="education-heading"
        label="// education"
        title="Education"
      />

      <div v-for="edu in education" :key="edu.institution" class="edu-card">
        <div class="edu-header">
          <div>
            <h3 class="edu-degree">{{ edu.degree }} of {{ edu.field }}</h3>
            <p class="edu-institution text-primary">{{ edu.institution }}</p>
            <p class="edu-location text-muted">{{ edu.location }}</p>
          </div>
          <div class="edu-right">
            <span class="edu-gpa">
              <span class="gpa-label font-mono text-muted">GPA</span>
              <span class="gpa-value">{{ edu.gpa }}</span>
            </span>
            <span class="edu-period text-muted font-mono">{{ edu.period }}</span>
          </div>
        </div>

        <div class="edu-details">
          <div class="edu-honors">
            <h4 class="detail-label text-muted font-mono">Honors</h4>
            <ul role="list">
              <li v-for="honor in edu.honors" :key="honor" class="honor-item">
                <StarIcon :size="14" class="text-primary" aria-hidden="true" />
                <span>{{ honor }}</span>
              </li>
            </ul>
          </div>

          <div class="edu-courses">
            <h4 class="detail-label text-muted font-mono">Relevant Coursework</h4>
            <div class="course-tags">
              <BaseTag v-for="course in edu.coursework" :key="course">{{ course }}</BaseTag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star as StarIcon } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseTag from '@/components/ui/BaseTag.vue'
import { education } from '@/data/education'
</script>

<style scoped>
.edu-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-8);
  max-width: 800px;
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-6);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.edu-degree {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.edu-institution {
  font-size: var(--text-base);
  margin-top: var(--space-2);
  font-weight: var(--font-medium);
}

.edu-location {
  font-size: var(--text-sm);
  margin-top: 2px;
}

.edu-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
  flex-shrink: 0;
}

.edu-gpa {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.gpa-label {
  font-size: var(--text-xs);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.gpa-value {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
}

.edu-period {
  font-size: var(--text-xs);
}

.edu-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  margin-top: var(--space-6);
}

.detail-label {
  font-size: var(--text-xs);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.honor-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text);
}

.course-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

@media (max-width: 640px) {
  .edu-details {
    grid-template-columns: 1fr;
  }

  .edu-header {
    flex-direction: column;
  }

  .edu-right {
    align-items: flex-start;
  }
}
</style>
