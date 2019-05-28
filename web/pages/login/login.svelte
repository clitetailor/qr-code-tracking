<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div
      class="mdl-layout__drawer-button"
      on:click={() => page('/')}>
      <i class="material-icons">arrow_back</i>
    </div>
    <div class="mdl-layout__header-row">
      <div class="mdl-layout-spacer" />
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/login">Login</a>
        <a class="mdl-navigation__link" href="/signup">
          Signup
        </a>
      </nav>
    </div>
  </header>
  <main class="mdl-layout__content c-login__layout">
    <form class="c-login__form" action="#" on:submit={onSubmit}>
      <h4 class="c-form__title">Login</h4>
      <div
        class="mdl-textfield mdl-js-textfield
        mdl-textfield--floating-label">
        <input
          name="username"
          class="mdl-textfield__input"
          type="text"
          bind:value={username} />
        <label class="mdl-textfield__label">Username</label>
      </div>
      <div
        class="mdl-textfield mdl-js-textfield
        mdl-textfield--floating-label"
        class:is-invalid={errMsg}>
        <input
          name="password"
          class="mdl-textfield__input"
          type="password"
          bind:value={password} />
        <label class="mdl-textfield__label" for="password">
          Password
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

<style>
  .c-login__form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }

  .c-form__title {
    margin: 0;
    width: auto;
  }
</style>

<script>
  import { login } from '../../graphql/auth'
  import { loadMdl } from '../../utils/mdl'
  import { usePage } from '../../utils/page'

  let errMsg = ''

  let username = ''
  let password = ''

  loadMdl()
  const page = usePage()

  async function onSubmit(event) {
    event.preventDefault()
    try {
      const payload = await login(username, password)

      page('/dashboard')
    } catch (error) {
      if ('graphQLErrors' in error) {
        errMsg = error.graphQLErrors[0].message
      }
      throw error
    }
  }
</script>
