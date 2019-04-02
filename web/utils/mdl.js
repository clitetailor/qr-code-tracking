import { onMount } from 'svelte'

export function initMdl() {
  onMount(() => {
    componentHandler.upgradeAllRegistered()
  })
}
