<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent />

    <div class="content-wrapper">
      <h1 class="dashboard-heading">Car Rental Dashboard</h1>
      <div class="buttons-container">
        <RouterLink to="/dashboard">
          <button class="medium-button dashboard-button">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </button>
        </RouterLink>
        <RouterLink to="/list-of-cars">
          <button class="medium-button cars-button">
            <i class="fa fa-car"></i> Cars
          </button>
        </RouterLink>
        <RouterLink to="/list-of-car-bookings">
          <button class="medium-button bookings-button">
            <i class="fa fa-taxi"></i> Bookings
          </button>
        </RouterLink>
        <RouterLink to="/list-of-blogs">
          <button class="medium-button blogs-button">
            <i class="fa fa-book"></i> Blogs
          </button>
        </RouterLink>
        <RouterLink to="/list-of-services">
          <button class="medium-button services-button">
            <i class="fa fa-plane"></i> Services
          </button>
        </RouterLink>
        <RouterLink to="/update-profile">
          <button class="medium-button profile-button">
            <i class="fa fa-user"></i> Profile
          </button>
        </RouterLink>
        <RouterLink to="/change-password">
          <button class="medium-button password-button">
            <i class="fa fa-key"></i> Change Password
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SidebarComponent from '../../components/SidebarComponent.vue'
import TopNavigationComponent from '../../components/TopNavigationComponent.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    SidebarComponent,
    TopNavigationComponent,
    RouterLink
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


<style>
.medium-button {
  display: block;
  width: 200px;
  height: 150px;
  margin: 10px;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.medium-button:hover {
  background-color: #ff5722;
}

.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
}

.buttons-container RouterLink {
  flex-basis: calc(50% - 30px);
}

.dashboard-heading {
  text-align: center;
  font-size: 36px;
  color: #333;
  margin-bottom: 30px;
}
</style>