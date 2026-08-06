import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollSpy(sectionIds: string[]) {
    const activeSection = ref<string>(sectionIds[0] ?? '')

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id
                }
            }
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    onMounted(() => {
        for (const id of sectionIds) {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        }
    })

    onUnmounted(() => {
        observer.disconnect()
    })

    return { activeSection }
}
