<template>
  <header class="app-header" :class="{ scrolled: isScrolled }" role="banner">
    <div class="container header-inner">
      <a href="/" class="logo" aria-label="Phan Thanh Binh — Home">
        <span class="logo-name">Phan Thanh Binh</span>
        <span class="logo-dot" aria-hidden="true">.</span>
      </a>

      <nav class="nav-desktop" aria-label="Primary navigation">
        <ul role="list">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="nav-link"
              :class="{ active: activeSection === link.id }"
              @click="handleNavClick($event, link.href)"
            >{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <a
        href="https://github.com/pthanhbinh1654"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
        aria-label="GitHub profile (opens in new tab)"
      >
        <GithubIcon :size="20" aria-hidden="true" />
        <span>GitHub</span>
      </a>

      <button
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <MenuIcon v-if="!menuOpen" :size="22" aria-hidden="true" />
        <XIcon v-else :size="22" aria-hidden="true" />
      </button>
    </div>

    <!-- Mobile menu -->
    <nav
      v-if="menuOpen"
      id="mobile-menu"
      class="nav-mobile"
      aria-label="Mobile navigation"
    >
      <ul role="list">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="nav-link-mobile"
            @click="handleMobileNavClick($event, link.href)"
          >{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Github as GithubIcon, Menu as MenuIcon, X as XIcon } from 'lucide-vue-next'
import { useScrollSpy } from '@/composables/useScrollSpy'

const navLinks = [
  { href: '#about', label: 'About', id: 'about' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#education', label: 'Education', id: 'education' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

const { activeSection } = useScrollSpy(navLinks.map((l) => l.id))

const isScrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function handleNavClick(event: MouseEvent, href: string) {
  if (href.startsWith('#')) {
    event.preventDefault()
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleMobileNavClick(event: MouseEvent, href: string) {
  menuOpen.value = false
  handleNavClick(event, href)
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  transition: background var(--transition), border-bottom var(--transition);
}

.app-header.scrolled {
  background: rgba(7, 17, 31, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  height: var(--nav-height);
}

.logo {
  display: flex;
  align-items: center;
  gap: 1px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-name {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.logo-dot {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  line-height: 1;
}

.nav-desktop {
  margin-left: auto;
}

.nav-desktop ul {
  display: flex;
  gap: var(--space-1);
  align-items: center;
}

.nav-link {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-muted);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background var(--transition-fast);
  text-decoration: none;
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

.nav-link.active {
  color: var(--color-primary);
}

.github-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), border-color var(--transition-fast);
  text-decoration: none;
  flex-shrink: 0;
}

.github-link:hover {
  color: var(--color-text);
  border-color: rgba(255, 255, 255, 0.2);
  opacity: 1;
}

.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  color: var(--color-muted);
  margin-left: auto;
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast);
}

.menu-toggle:hover {
  color: var(--color-text);
}

.nav-mobile {
  background: rgba(7, 17, 31, 0.98);
  border-top: 1px solid var(--color-border);
  padding: var(--space-4) var(--space-6);
}

.nav-mobile ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-link-mobile {
  display: block;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-muted);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background var(--transition-fast);
  text-decoration: none;
}

.nav-link-mobile:hover {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }

  .github-link span {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
