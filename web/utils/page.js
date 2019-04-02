import pagejs from 'page'
import { onMount, onDestroy } from 'svelte'

export function usePage() {
  const page = pagejs.create()

  onMount(() => {
    page.start()
  })
  onDestroy(() => {
    page.stop()
  })

  return page
}
