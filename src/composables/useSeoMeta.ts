import { watch } from 'vue'
import { useRoute } from 'vue-router'

interface SeoMeta {
    title: string
    description: string
}

export function useSeoMeta({ title, description }: SeoMeta) {
    const route = useRoute()

    const updateMeta = () => {
        // Title
        document.title = title

        // Description
        const desc = document.querySelector('meta[name="description"]')
        if (desc) desc.setAttribute('content', description)

        // OG title
        const ogTitle = document.querySelector('meta[property="og:title"]')
        if (ogTitle) ogTitle.setAttribute('content', title)

        // OG description
        const ogDesc = document.querySelector('meta[property="og:description"]')
        if (ogDesc) ogDesc.setAttribute('content', description)

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

    if (route) {
        watch(() => route?.path, updateMeta, { immediate: true })
    } else {
        updateMeta()
    }
}
