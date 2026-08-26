import { ref, computed } from 'vue'
import { translations, type Locale } from './translations'

const STORAGE_KEY = 'portfolio_locale'

function getInitialLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
  if (saved === 'vi' || saved === 'en') {
    return saved
  }
  // Check browser language
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('vi')) {
    return 'vi'
  }
  return 'vi' // Default to Vietnamese
}

const currentLocale = ref<Locale>(getInitialLocale())

export function useLocale() {
  const locale = computed(() => currentLocale.value)

  function setLocale(newLocale: Locale) {
    currentLocale.value = newLocale
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
      document.documentElement.lang = newLocale
    } catch {
      // Ignore storage errors in restricted iframe/browser environments
    }
  }

  function toggleLocale() {
    setLocale(currentLocale.value === 'vi' ? 'en' : 'vi')
  }

  const t = computed(() => translations[currentLocale.value])

  return {
    locale,
    setLocale,
    toggleLocale,
    t,
  }
}
