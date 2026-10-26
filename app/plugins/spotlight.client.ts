// Tells `.card` and `.spot` elements where the pointer is, as --mx/--my, so
// main.css can paint a soft light under it. One listener for the whole page,
// at most one update per frame, and nothing at all on touch screens.
export default defineNuxtPlugin(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  let frame = 0
  let last: PointerEvent | undefined
  document.addEventListener(
    'pointermove',
    (e) => {
      last = e
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const el = (last!.target as Element).closest?.<HTMLElement>('.card, .spot')
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${last!.clientX - r.left}px`)
        el.style.setProperty('--my', `${last!.clientY - r.top}px`)
      })
    },
    { passive: true },
  )
})
