<script>
  import { onMount } from 'svelte'

  import { usePage } from '../../utils/page'
  import { loadMdl } from '../../utils/mdl'
  import { getQRCodePublicData } from '../../graphql/qrcode'
  import { addTrackingInfo } from '../../graphql/trackinginfo'

  loadMdl()
  const page = usePage()

  let qrcodeId = null
  let dialog = null
  let redirectUrl = null
  let loading = true
  let invalid = false
  let messageSended = false
  let hasRedirectUrl = false

  onMount(() => {
    dialog.showModal()
  })

  page('/qrcode/:qrcodeId', async ctx => {
    qrcodeId = ctx.params.qrcodeId

    try {
      const qrcodePublicData = await getQRCodePublicData(
        qrcodeId
      )
    } catch (error) {
      invalid = true
    }

    loading = false
  })

  function sendTrackingInfo() {
    navigator.geolocation.getCurrentPosition(async position => {
      loading = true

      try {
        const trackingInfo = await addTrackingInfo({
          qrcodeId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          userAgent: navigator.userAgent
        })

        if (trackingInfo.redirectUrl) {
          redirectUrl = trackingInfo.redirectUrl
          hasRedirectUrl = true
        }

        messageSended = true
      } catch (error) {
      } finally {
        loading = false
      }
    })
  }

  function gotoWebsite() {
    page(redirectUrl)
  }
</script>

<dialog class="mdl-dialog" bind:this={dialog}>
  {#if loading}
    <div class="mdl-dialog__content">
      <p>Loading...</p>
    </div>
  {:else if invalid}
    <div class="mdl-dialog__content">
      <p>This QRCode is unavailable!</p>
    </div>
  {:else if messageSended}
    <div class="mdl-dialog__content">
      <p>
        Thanks for sending us the information about your
        location!
      </p>
      {#if hasRedirectUrl}
        <p>
          Click
          <b>Goto</b>
          to go to redirect website!
        </p>
      {/if}
    </div>
    {#if hasRedirectUrl}
      <div class="mdl-dialog__actions">
        <button
          type="button"
          class="mdl-button"
          on:click={gotoWebsite}>
          Goto
        </button>
      </div>
    {/if}
    <!--  -->
  {:else}
    <h4 class="mdl-dialog__title">QRCode Tracking</h4>
    <div class="mdl-dialog__content">
      <p>
        Send us tracking info by clicking
        <b>Send</b>
        button!
      </p>
    </div>
    <div class="mdl-dialog__actions">
      <button
        type="button"
        class="mdl-button"
        on:click={sendTrackingInfo}>
        Send
      </button>
    </div>
  {/if}
</dialog>
