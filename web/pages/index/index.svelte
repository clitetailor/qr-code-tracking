<script>
  import { usePage } from '../../utils/page'

  const page = usePage()
</script>

<style>
  .c-home__main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
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
  <main class="mdl-layout__content c-home__main">
    <div class="c-home__title">
      <h3>QR Code Tracking</h3>
    </div>
    <div class="c-home__action">
      <button
        class="mdl-button mdl-js-button mdl-button--raised
        mdl-button--colored"
        on:click={() => page('/login')}>
        Getting Started
      </button>
    </div>
  </main>
</div>
