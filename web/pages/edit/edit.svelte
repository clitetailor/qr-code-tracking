<script>
  import { loadMdl } from '../../utils/mdl'
  import { usePage } from '../../utils/page'
  import {
    createQRCode,
    getQRCode,
    updateQRCode
  } from '../../graphql/qrcode'

  loadMdl()
  const page = usePage()

  let errMsg = ''

  let title = ''
  let description = ''
  let redirectUrl = ''

  let id

  page('/edit/:id', async ctx => {
    id = ctx.params.id

    const qrcode = await getQRCode(id)
    title = qrcode.title
    description = qrcode.description
    redirectUrl = qrcode.redirectUrl
  })

  async function onSubmit(event) {
    event.preventDefault()

    if (title.match(/^\s*$/)) {
      errMsg = 'Title is required!'
      return
    }

    if (!id) {
      await createQRCode({
        title,
        description,
        redirectUrl
      })
    } else {
      await updateQRCode(id, {
        title,
        description,
        redirectUrl
      })
    }

    page('/dashboard')
  }
</script>

<style>
  .c-qrcode__form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
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
  <main class="mdl-layout__content">
    <form
      class="c-qrcode__form"
      action="#"
      on:submit={onSubmit}>
      <div
        class="mdl-textfield mdl-js-textfield
        mdl-textfield--floating-label"
        class:is-dirty={title}>
        <input
          name="title"
          class="mdl-textfield__input"
          type="text"
          bind:value={title} />
        <label class="mdl-textfield__label" for="title">
          Title
        </label>
      </div>
      <div
        class="mdl-textfield mdl-js-textfield
        mdl-textfield--floating-label"
        class:is-dirty={redirectUrl}>
        <input
          name="redirectUrl"
          class="mdl-textfield__input"
          type="text"
          bind:value={redirectUrl} />
        <label class="mdl-textfield__label" for="description">
          Redirect URL
        </label>
      </div>
      <div
        class="mdl-textfield mdl-js-textfield
        mdl-textfield--floating-label"
        class:is-dirty={description}
        class:is-invalid={errMsg}>
        <textarea
          name="description"
          class="mdl-textfield__input"
          rows="3"
          type="text"
          bind:value={description} />
        <label class="mdl-textfield__label" for="description">
          Description
        </label>
        <span class="mdl-textfield__error">{errMsg}</span>
      </div>
      <button
        class="mdl-button mdl-js-button mdl-button--raised
        mdl-button--colored">
        Submit
      </button>
    </form>
  </main>
</div>
