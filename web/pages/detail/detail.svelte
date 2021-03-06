<script>
  import { onDestroy } from 'svelte'
  import moment from 'moment'

  import HereMap from '../shared/here-map.svelte'

  import { loadMdl } from '../../utils/mdl'
  import { usePage } from '../../utils/page'
  import { getQRCode } from '../../graphql/qrcode'
  import {
    getTrackingInfos,
    trackingInfoAdded
  } from '../../graphql/trackinginfo'
  import { qrcodeUpdated } from '../../graphql/qrcode'

  loadMdl()
  const page = usePage()

  let trackingInfos = []
  let hereMap = null
  let qrcodeId = null
  let qrcode = {}
  let qrcodeImg = null
  let process = null

  const subscriptions = {}

  page('/detail/:id', async context => {
    qrcodeId = parseInt(context.params.id)

    qrcode = await getQRCode(qrcodeId)
    trackingInfos = (await getTrackingInfos(qrcodeId)).reverse()

    if (trackingInfos.length > 0) {
      hereMap.initMarkers(trackingInfos)
    }

    subscriptions.trackingInfoAdded = trackingInfoAdded(
      qrcodeId
    ).subscribe(trackingInfo => {
      trackingInfos.unshift(trackingInfo)
      hereMap.addMarker(trackingInfo)

      trackingInfos = trackingInfos
    })

    subscriptions.qrcodeUpdated = qrcodeUpdated().subscribe(
      q => {
        if (q.id === qrcodeId) {
          qrcode = q
        }
      }
    )
  })

  onDestroy(() => {
    subscriptions.trackingInfoAdded.unsubscribe()
    subscriptions.qrcodeUpdated.unsubscribe()
  })

  function extractDeviceInfo(userAgent) {
    const matchGroup =
      userAgent && userAgent.match(/\(([^\)]*)\)/)

    return (matchGroup && matchGroup[1]) || userAgent
  }
</script>

<style>
  .c-detail {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .c-detail__here-map {
    height: 80%;
    box-shadow: 0 3px 5px hsla(0, 0%, 80%, 0.8);
  }

  .c-detail__content {
    padding: 40px;
    padding-bottom: 50vh;
  }

  .c-detail__section {
    max-width: 800px;
    margin-bottom: 20px;
  }

  .c-detail__image {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .c-detail__table {
    width: 100%;
    table-layout: fixed;
  }

  .c-detail__table tr {
    cursor: pointer;
  }

  .c-detail__table td span {
    word-break: break-all;
    word-wrap: break-word;
  }
</style>

<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div
      class="mdl-layout__drawer-button"
      on:click={() => page('/dashboard')}>
      <i class="material-icons">arrow_back</i>
    </div>
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">New</span>
    </div>
  </header>
  <main class="mdl-layout__content c-detail">
    <div class="c-detail__here-map">
      <HereMap bind:this={hereMap} />
    </div>

    <div class="c-detail__content">
      <div
        class="mdl-grid mdl-grid--no-spacing mdl-shadow--2dp
        c-detail__section">
        <div
          class="mdl-cell--3-col-desktop mdl-cell--2-col-tablet
          mdl-cell--4-col-phone mdl-color--teal-100
          mdl-color-text--white c-detail__image">
          <img
            bind:this={qrcodeImg}
            src="/assets/{qrcodeId}.png"
            alt="qrcode" />
        </div>
        <div
          class="mdl-card mdl-cell mdl-cell--9-col-desktop
          mdl-cell--6-col-tablet mdl-cell--4-col-phone">
          <div class="mdl-card__supporting-text">
            <p>
              <b>Title:</b>
              <span>{qrcode.title}</span>
            </p>
            <p>
              <b>Description:</b>
              {#if qrcode.description}
                <span>{qrcode.description}</span>
              {:else}
                <span>(None)</span>
              {/if}
            </p>
            <p>
              <b>Redirect URL:</b>
              {#if qrcode.redirectUrl}
                <a href={qrcode.redirectUrl}>
                  {qrcode.redirectUrl}
                </a>
              {:else}
                <span>(None)</span>
              {/if}
            </p>
            <p>
              <b>Tracking URL:</b>
              <a
                href="{process.env.APP_DOMAIN}/qrcode/{qrcode.id}">
                {process.env.APP_DOMAIN}/qrcode/{qrcode.id}
              </a>
            </p>
          </div>

          <div class="mdl-card__menu">
            <button
              class="mdl-button mdl-button--icon mdl-js-button
              mdl-js-ripple-effect"
              on:click={() => page(`/edit/${qrcode.id}`)}>
              <i class="material-icons">edit</i>
            </button>
          </div>
        </div>
      </div>

      <div
        class="mdl-grid mdl-grid--no-spacing c-detail__section">
        <table
          class="mdl-data-table mdl-js-data-table
          mdl-shadow--2dp c-detail__table">
          <thead>
            <tr>
              <th class="mdl-data-table__cell--non-numeric">
                Device
              </th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {#each trackingInfos as trackingInfo}
              <tr
                on:click={() => hereMap.navigateTo(trackingInfo.latitude, trackingInfo.longitude)}>
                <td class="mdl-data-table__cell--non-numeric">
                  <span>
                    {extractDeviceInfo(trackingInfo.userAgent)}
                  </span>
                </td>
                <td>{trackingInfo.latitude}</td>
                <td>{trackingInfo.longitude}</td>
                <td>
                  {moment(trackingInfo.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>
