<template>
  <div class="background-image">
    <div class="hold-transition login-page">
      <div class="login-box">
        <div class="card card-outline card-primary">
          <div class="card-header text-center">
            <router-link to="/login" class="h1"> <b>Car</b>Rental </router-link>
          </div>
          <div class="card-body">
            <p class="login-box-msg">Your Account Has Been Verified. Go Back To The Login Page</p>

            <p class="mb-1">
              <router-link to="/login">Login</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API_URL from '../../config'

export default {
  name: 'ActivateAccount',
  setup() {
    const state = reactive({
      token: ''
    })

    const router = useRouter()

    onMounted(async () => {
      const tokenFromURL = router.currentRoute.value.query.token
      state.token = tokenFromURL
      await activateAccount()
    })

    async function activateAccount() {
      await axios.post(API_URL + '/activateAccount', {
        token: state.token
      })
    }

    return {
      state
    }
  }
}
</script>
<style scoped>
.background-image {
  background-image: url('/img/bg2.jpg') !important;
  background-size: cover;
}
</style>
