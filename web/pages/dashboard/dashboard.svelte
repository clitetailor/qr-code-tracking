<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">Dashboard</span>
      <div class="mdl-layout-spacer" />
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" on:click={logout}>
          Logout
        </a>
      </nav>
    </div>
  </header>
  <main class="mdl-layout__content c-dashboard__main">
    <div class="mdl-grid">
      {#each qrcodes as qrcode (qrcode.id)}
        <div class="mdl-cell mdl-cell--4-col">
          <div class="mdl-card mdl-shadow--2dp c-card">
            <div class="mdl-card__media c-card__image">
              <img src="/assets/{qrcode.id}.png" alt="qrcode" />
            </div>
            <div class="mdl-card__title c-card__title">
              <h2 class="mdl-card__title-text">
                {qrcode.title}
              </h2>
            </div>
            <div
              class="mdl-card__supporting-text
              c-card__supporting-text">
              {#if qrcode.description}{qrcode.description}{/if}
            </div>
            <div class="mdl-card__actions mdl-card--border">
              <a
                class="mdl-button mdl-button--colored
                mdl-js-button mdl-js-ripple-effect"
                on:click={() => page(`/detail/${qrcode.id}`)}>
                Detail
              </a>
              <a
                class="mdl-button mdl-button--colored
                mdl-js-button mdl-js-ripple-effect"
                on:click={() => page(`/edit/${qrcode.id}`)}>
                Edit
              </a>
            </div>
            <div class="mdl-card__menu">
              <button
                class="mdl-button mdl-button--icon mdl-js-button
                mdl-js-ripple-effect"
                on:click={() => shareQRCode(qrcode)}>
                <i class="material-icons">share</i>
              </button>
              <button
                class="mdl-button mdl-js-button mdl-button--icon"
                on:click={() => onCardMenuRemoveClick(qrcode.id)}>
                <i class="material-icons">close</i>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <button
      class="mdl-button mdl-js-button mdl-button--fab
      mdl-js-ripple-effect mdl-button--colored c-button__fab"
      on:click={onFabButtonClick}>
      <i class="material-icons">add</i>
    </button>
  </main>
</div>

<style>
  .c-dashboard__main {
    padding-bottom: 180px;
    width: 100%;
    height: 100%;
  }

  .c-button__fab {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 40px;
    z-index: 1000;
  }

  .c-card {
    width: 100%;
  }

  .c-title {
    position: relative;
  }

  .c-card__title {
    height: 68px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .c-card__supporting-text {
    height: 68px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  /*
  .c-card {
    padding-left: 180px;
    width: 100%;
    min-height: auto;
    height: 180px;
    position: relative;
  }
  */

  .c-card__image {
    padding: 20px;
    display: flex;
    justify-content: center;

    /*
    width: 180px;
    height: 180px;
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    */
  }
</style>

<script>
  import { onMount, onDestroy } from 'svelte'

  import {
    getQRCodes,
    removeQRCode,
    qrcodeAdded,
    qrcodeUpdated,
    qrcodeRemoved
  } from '../../graphql/qrcode'
  import { logout as _logout } from '../../graphql/auth'
  import { loadMdl } from '../../utils/mdl'
  import { usePage } from '../../utils/page'

  loadMdl()
  const page = usePage()

  let qrcodes = []
  let subscriptions = {}

  onMount(async () => {
    qrcodes = await getQRCodes()

    subscriptions.qrcodeAdded = qrcodeAdded().subscribe(
      qrcode => {
        qrcodes.push(qrcode)
        qrcodes = qrcodes
      }
    )
    subscriptions.qrcodeUpdated = qrcodeUpdated().subscribe(
      qrcode => {
        const qrcodeIndex = qrcodes.findIndex(
          c => c.id === qrcode.id
        )

        if (qrcodeIndex !== -1) {
          Object.assign(qrcodes[qrcodeIndex], qrcode)
          qrcodes = qrcodes
        }
      }
    )
    subscriptions.qrcodeRemoved = qrcodeRemoved().subscribe(
      qrcode => {
        const qrcodeIndex = qrcodes.findIndex(
          c => c.id === qrcode.id
        )

        if (qrcodeIndex !== -1) {
          qrcodes.splice(qrcodeIndex, 1)
          qrcodes = qrcodes
        }
      }
    )
  })

  onDestroy(() => {
    subscriptions.qrcodeAdded.unsubscribe()
    subscriptions.qrcodeUpdated.unsubscribe()
    subscriptions.qrcodeRemoved.unsubscribe()
  })

  function onFabButtonClick() {
    page('/edit')
  }

  function onCardMenuRemoveClick(qrcodeId) {
    removeQRCode(qrcodeId)
  }

  function shareQRCode(qrcode) {
    if (navigator.share) {
      navigator.share({
        title: qrcode.title,
        text: qrcode.description,
        url: `${process.env.APP_DOMAIN}/assets/${qrcode.id}.png`
      })
    }
  }

  function logout(event) {
    event.preventDefault()

    _logout()
    page('/')
  }
</script>
