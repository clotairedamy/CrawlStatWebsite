// `v-reveal` fades an element up the first time it scrolls into view.
// `v-reveal="120"` delays it by 120 ms, for staggering a row of cards.
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined

  const observe = (el: HTMLElement) => {
    observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer!.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    observer.observe(el)
  }

  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    getSSRProps: () => ({ class: 'reveal' }),
    mounted(el, binding) {
      el.classList.add('reveal')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  })
})
