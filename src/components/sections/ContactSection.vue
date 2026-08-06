<template>
  <section id="contact" class="section" aria-labelledby="contact-heading">
    <div class="container">
      <SectionHeading
        id="contact-heading"
        label="// contact"
        title="Get in Touch"
        description="Open to SOC Analyst, Security Engineer, and PKI Engineer roles. Reach out via email or GitHub."
      />

      <div class="contact-grid">
        <a href="mailto:pthanhbinh2654@gmail.com" class="contact-card hover-lift" aria-label="Send email">
          <div class="contact-icon" aria-hidden="true">
            <MailIcon :size="24" />
          </div>
          <div class="contact-text">
            <p class="contact-method">Email</p>
            <p class="contact-value">pthanhbinh2654@gmail.com</p>
          </div>
          <ExternalLinkIcon :size="16" class="contact-arrow text-muted" aria-hidden="true" />
        </a>

        <a
          href="https://github.com/pthanhbinh1654"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-card hover-lift"
          aria-label="GitHub profile (opens in new tab)"
        >
          <div class="contact-icon" aria-hidden="true">
            <GithubIcon :size="24" />
          </div>
          <div class="contact-text">
            <p class="contact-method">GitHub</p>
            <p class="contact-value">pthanhbinh1654</p>
          </div>
          <ExternalLinkIcon :size="16" class="contact-arrow text-muted" aria-hidden="true" />
        </a>
      </div>

      <p class="contact-note text-muted">
        Based in Can Tho, Vietnam. Available for remote or on-site positions.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mail as MailIcon, Github as GithubIcon, ExternalLink as ExternalLinkIcon } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
  max-width: 640px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition), transform var(--transition);
}

.contact-card:hover {
  border-color: rgba(56, 189, 248, 0.2);
  box-shadow: var(--shadow-primary);
  background: var(--color-card-hover);
  opacity: 1;
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-primary-dim);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.contact-text {
  flex: 1;
}

.contact-method {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-value {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-top: 2px;
}

.contact-arrow {
  flex-shrink: 0;
}

.contact-note {
  margin-top: var(--space-8);
  font-size: var(--text-sm);
}

@media (max-width: 560px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
