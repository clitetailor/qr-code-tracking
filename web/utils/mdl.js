import { onMount } from 'svelte'

export function loadMdl() {
  onMount(() => {
    componentHandler.upgradeAllRegistered()
  })
}
