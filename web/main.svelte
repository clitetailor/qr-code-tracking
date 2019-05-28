<svelte:component this={comp} />

<script>
  import { usePage } from './utils/page'
  import { checkAuth } from './graphql/auth'

  import Home from './pages/index/index.svelte'
  import Login from './pages/login/login.svelte'
  import Signup from './pages/signup/signup.svelte'
  import Dashboard from './pages/dashboard/dashboard.svelte'
  import Edit from './pages/edit/edit.svelte'
  import Detail from './pages/detail/detail.svelte'
  import QRCode from './pages/qrcode/qrcode.svelte'

  let comp

  const page = usePage()

  page('/', () => {
    ifAuthed(() => {
      comp = Home
    })
  })
  page('/login', () => {
    ifAuthed(() => {
      comp = Login
    })
  })
  page('/signup', () => {
    ifAuthed(() => {
      comp = Signup
    })
  })

  page('/dashboard', () => {
    ifNotAuthed(() => {
      comp = Dashboard
    })
  })
  page('/edit*', () => {
    ifNotAuthed(() => {
      comp = Edit
    })
  })
  page('/detail/*', () => {
    ifNotAuthed(() => {
      comp = Detail
    })
  })
  page('/qrcode/*', () => {
    comp = QRCode
  })

  async function ifNotAuthed(callback) {
    const authStatus = await checkAuth()

    if (authStatus.ok) {
      callback()
    } else {
      page('/')
    }
  }

  async function ifAuthed(callback) {
    const authStatus = await checkAuth()

    if (!authStatus.ok) {
      callback()
    } else {
      page('/dashboard')
    }
  }
</script>
