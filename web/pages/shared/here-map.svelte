<script>
  import { onMount, beforeUpdate } from 'svelte'

  let mapContainer
  export let latitude = 52.5
  export let longitude = 13.4

  let map
  let marker

  onMount(() => {
    const platform = new H.service.Platform({
      app_id: process.env.HERE_MAP_API,
      app_code: process.env.HERE_MAP_CODE,
      useHTTPS: true
    })

    const defaultLayers = platform.createDefaultLayers()
    map = new H.Map(mapContainer, defaultLayers.normal.map, {
      zoom: 15,
      center: new H.geo.Point(latitude, longitude)
    })

    const behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(map)
    )
  })

  export function initMarkers(trackingInfos) {
    const markers = []
    const group = new H.map.Group()

    for (const trackingInfo of trackingInfos) {
      const { latitude, longitude } = trackingInfo

      const m = new H.map.Marker({
        lat: latitude,
        lng: longitude
      })

      markers.push(m)
    }
    group.addObjects(markers)
    map.addObject(group)

    map.setViewBounds(group.getBounds())
  }

  export function addMarker(trackingInfo) {
    const { latitude, longitude } = trackingInfo

    marker = new H.map.Marker({
      lat: latitude,
      lng: longitude
    })
    map.addObject(marker)
  }

  export function navigateTo(latitude, longitude) {
    map.setCenter(
      {
        lat: latitude,
        lng: longitude
      },
      true
    )
  }

  function onResize() {
    map.getViewPort().resize()
  }
</script>

<style>
  .c-here-map {
    width: 100%;
    height: 100%;
  }
</style>

<div class="c-here-map" bind:this={mapContainer} />

<svelte:window on:resize={onResize} />
