<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SidebarComponent from '../../components/SidebarComponent.vue'
import TopNavigationComponent from '../../components/TopNavigationComponent.vue'

export default {
  components: {
    SidebarComponent,
    TopNavigationComponent
  },
  setup() {
    const router = useRouter()

    onMounted(() => {
      const checkAuth = async () => {
        const cookies = document.cookie
          .split(';')
          .map((cookie) => cookie.trim().split('=').map(decodeURIComponent))

        const accessTokenCookie = cookies.find(([name]) => name === 'access_token')

        if (!accessTokenCookie) {
          router.push('/login')
        } else {
          router.push('/dashboard')
        }
      }

      checkAuth()
    })
  }
}
</script>

<template>
  <div class="wrapper">
    <TopNavigationComponent class="navbar navbar-expand navbar-white navbar-light" />
    <SidebarComponent class="main-sidebar sidebar-dark-primary elevation-4" />
  </div>
</template>
