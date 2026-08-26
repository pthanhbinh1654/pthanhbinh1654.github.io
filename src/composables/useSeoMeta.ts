import { watch, unref, type Ref, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'

interface SeoMeta {
  title: string | Ref<string> | ComputedRef<string>
  description: string | Ref<string> | ComputedRef<string>
}

export function useSeoMeta({ title, description }: SeoMeta) {
  const route = useRoute()

  const updateMeta = () => {
    const titleVal = unref(title)
    const descVal = unref(description)

    // Title
    document.title = titleVal

    // Description
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', descVal)

    // OG title
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', titleVal)

    // OG description
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', descVal)

    // OG URL
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', window.location.href)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = window.location.href
  }

  watch([() => route?.path, () => unref(title), () => unref(description)], updateMeta, {
    immediate: true,
  })
}
