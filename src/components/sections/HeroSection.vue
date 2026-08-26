<template>
  <section class="hero section" aria-labelledby="hero-heading">
    <div class="container hero-inner">
      <div class="hero-content fade-in">
        <p class="hero-label font-mono text-primary">{{ t.hero.label }}</p>
        <h1 id="hero-heading" class="hero-name">{{ t.hero.name }}</h1>
        <p class="hero-title text-muted">{{ t.hero.title }}</p>
        <p class="hero-description">
          {{ t.hero.description }}
        </p>
        <div class="hero-actions">
          <BaseButton href="#projects" variant="primary">
            <FolderIcon :size="16" aria-hidden="true" />
            {{ t.hero.viewProjects }}
          </BaseButton>
          <BaseButton href="#contact" variant="secondary">
            <MailIcon :size="16" aria-hidden="true" />
            {{ t.hero.contact }}
          </BaseButton>
          <BaseButton
            href="https://github.com/pthanhbinh1654"
            variant="ghost"
            external
            aria-label="GitHub profile (opens in new tab)"
          >
            <GithubIcon :size="16" aria-hidden="true" />
            {{ t.hero.github }}
          </BaseButton>
        </div>
      </div>

      <div class="hero-meta fade-in fade-in-delay-2">
        <dl class="hero-stats">
          <div class="stat-item">
            <dt class="stat-label text-muted font-mono">{{ t.hero.statDegreeLabel }}</dt>
            <dd class="stat-value">{{ t.hero.statDegreeValue }}</dd>
          </div>
          <div class="stat-item">
            <dt class="stat-label text-muted font-mono">{{ t.hero.statGpaLabel }}</dt>
            <dd class="stat-value">3.85 <span class="text-muted">/ 4.00</span></dd>
          </div>
          <div class="stat-item">
            <dt class="stat-label text-muted font-mono">{{ t.hero.statUniversityLabel }}</dt>
            <dd class="stat-value">{{ t.hero.statUniversityValue }}</dd>
          </div>
          <div class="stat-item">
            <dt class="stat-label text-muted font-mono">{{ t.hero.statGraduatedLabel }}</dt>
            <dd class="stat-value">2026</dd>
          </div>
          <div class="stat-item">
            <dt class="stat-label text-muted font-mono">{{ t.hero.statProjectsLabel }}</dt>
            <dd class="stat-value">{{ t.hero.statProjectsValue }}</dd>
          </div>
          <div class="stat-item">
            <dt class="stat-label text-muted font-mono">{{ t.hero.statLocationLabel }}</dt>
            <dd class="stat-value">{{ t.hero.statLocationValue }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="hero-scroll" aria-hidden="true">
      <span class="font-mono text-muted">{{ t.hero.scroll }}</span>
      <ChevronDownIcon :size="16" class="text-muted" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Folder as FolderIcon, Mail as MailIcon, Github as GithubIcon, ChevronDown as ChevronDownIcon } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useLocale } from '@/i18n/useLocale'

const { t } = useLocale()
</script>

<style scoped>
.hero {
  min-height: calc(100dvh - var(--nav-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-block: var(--space-20);
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.hero-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: 0.03em;
  margin-bottom: var(--space-4);
}

.hero-name {
  font-size: clamp(var(--text-4xl), 5vw, 3.75rem);
  font-weight: var(--font-bold);
  letter-spacing: -0.02em;
  color: var(--color-text);
  line-height: 1.1;
}

.hero-title {
  font-size: clamp(var(--text-lg), 2.5vw, var(--text-xl));
  margin-top: var(--space-3);
  font-weight: var(--font-normal);
}

.hero-description {
  margin-top: var(--space-5);
  font-size: var(--text-base);
  color: var(--color-muted);
  max-width: 48ch;
  line-height: var(--leading-relaxed);
}

.hero-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-8);
  flex-wrap: wrap;
}

.hero-meta {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}

.hero-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.stat-label {
  font-size: var(--text-xs);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stat-value {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.hero-scroll {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  opacity: 0.5;
}

@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }

  .hero-scroll {
    display: none;
  }
}
</style>
