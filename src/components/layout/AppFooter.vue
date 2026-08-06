<template>
  <footer class="app-footer" role="contentinfo">
    <div class="container footer-inner">
      <div class="footer-left">
        <p class="footer-name">Phan Thanh Binh</p>
        <p class="footer-title text-muted">Information Security Graduate</p>
      </div>

      <nav class="footer-links" aria-label="Footer navigation">
        <a
          href="https://github.com/pthanhbinh1654"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
          aria-label="GitHub profile (opens in new tab)"
        >
          <GithubIcon :size="18" aria-hidden="true" />
          <span>GitHub</span>
        </a>
        <a
          href="mailto:pthanhbinh2654@gmail.com"
          class="footer-link"
          aria-label="Send email to pthanhbinh2654@gmail.com"
        >
          <MailIcon :size="18" aria-hidden="true" />
          <span>Email</span>
        </a>
      </nav>

      <p class="footer-copy text-muted">
        &copy; {{ year }} Phan Thanh Binh
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Github as GithubIcon, Mail as MailIcon } from 'lucide-vue-next'

const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  border-top: 1px solid var(--color-border);
  padding-block: var(--space-8);
  margin-top: var(--space-16);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.footer-name {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.footer-title {
  font-size: var(--text-xs);
  margin-top: var(--space-1);
}

.footer-links {
  display: flex;
  gap: var(--space-4);
}

.footer-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-text);
  opacity: 1;
}

.footer-copy {
  font-size: var(--text-xs);
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }
}
</style>
