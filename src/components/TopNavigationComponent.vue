<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <router-link to="" class="nav-link" data-widget="pushmenu" role="button">
      <i class="fas fa-bars"></i>
    </router-link>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <router-link
          to=""
          class="nav-link dropdown-toggle"
          id="dropdownSubMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            :src="`${API_URL2}/storage/profile_pictures/${profilePicture}`"
            alt=""
            class="rounded-circle mr-2 height"
          />
          <span class="d-none d-sm-inline-block">{{ name }}</span>
        </router-link>
        <ul class="dropdown-menu border-0 shadow" aria-labelledby="dropdownSubMenu1">
          <li>
            <router-link to="/update-profile">
              <button class="dropdown-item">Profile</button>
            </router-link>
          </li>
          <li>
            <router-link to="/change-password">
              <button class="dropdown-item">Change Password</button>
            </router-link>
          </li>
          <li>
            <button class="dropdown-item" @click="handleLogout">Logout</button>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import API_URL from '../config'
import API_URL2 from '../config2'
import Cookies from 'js-cookie'

export default {
  name: 'TopNavigation',
  setup() {
    const history = useRouter()
    const name = ref('')
    const profilePicture = ref('')

    const getUser = async () => {
      try {
        const accessToken = Cookies.get('access_token')
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
        const response = await axios.get(`${API_URL}/user`, config)
        name.value = response.data.name
        profilePicture.value = response.data.profile_picture || 'default_image.png'
      } catch (error) {
        console.log(error)
      }
    }

    const handleLogout = () => {
      const accessToken = Cookies.get('access_token')
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      axios
        .post(`${API_URL}/logout`, {}, config)
        .then((response) => {
          if (response.status === 200) {
            Cookies.remove('access_token')
            history.push('/login')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    onMounted(getUser)

    return {
      name,
      profilePicture,
      handleLogout,
      API_URL2
    }
  }
}
</script>
