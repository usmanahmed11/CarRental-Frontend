<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import API_URL from '../../config'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  setup() {
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const emailError = ref(null)
    const passwordError = ref(null)

    const handleSubmit = async () => {
      emailError.value = null
      passwordError.value = null

      // validate the form data
      if (!email.value) {
        emailError.value = 'Email is required'
      }
      if (!password.value) {
        passwordError.value = 'Password is required'
      }
      if (!email.value || !password.value) {
        return
      }

      try {
        // send a request to the server to exchange the user's login credentials for an access token
        const response = await axios.post(
          API_URL + '/login',
          {
            email: email.value,
            password: password.value
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        // store the access token in a secure way (such as in an HTTP-only cookie)
        document.cookie = `access_token=${response.data.access_token}; path=/; secure; http-only`

        const accessToken = response.data.access_token

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        router.push('/dashboard')
      } catch (err) {
        toast.error(err.response.data.error, {
          position: 'top-right',
          duration: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        })
      }
    }

    // check for the presence of an access token cookie
    onMounted(() => {
      const checkAuth = async () => {
        // Get all cookies as an array of key-value pairs
        const cookies = document.cookie
          .split(';')
          .map((cookie) => cookie.trim().split('=').map(decodeURIComponent))

        // Find the access token cookie
        const accessTokenCookie = cookies.find(([name]) => name === 'access_token')

        // Redirect the user to the login page if the access token cookie is not present
        if (!accessTokenCookie) {
          router.push('/login')
          return
        } else {
          // If the access token is present, redirect the user to the dashboard
          router.push('/dashboard')
        }
      }

      checkAuth()
    })

    return {
      email,
      password,
      emailError,
      passwordError,
      handleSubmit
    }
  }
}
</script>

<template>
  <div class="background-image">
    <div class="hold-transition login-page">
      <div class="login-box">
        <div class="card card-outline card-primary">
          <div class="card-header text-center">
            <router-link to="/login" class="h1"><b>Car</b>Rental</router-link>
          </div>
          <div class="card-body">
            <p class="login-box-msg">Sign in to start your booking</p>

            <form @submit.prevent="handleSubmit" autocomplete="off">
              <div class="input-group mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  :class="{ 'form-control': true, 'is-invalid': emailError }"
                  placeholder="Email"
                  v-model="email"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <p v-if="emailError" style="color: red">{{ emailError }}</p>

              <div class="input-group mb-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  :class="{ 'form-control': true, 'is-invalid': passwordError }"
                  placeholder="Password"
                  v-model="password"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <p v-if="passwordError" style="color: red">{{ passwordError }}</p>

              <div class="row">
                <div class="col-8"></div>

                <div class="col-4">
                  <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>
            </form>

            <p class="mb-1">
              <router-link to="/reset-password">Forgot password?</router-link>
            </p>
            <p class="mb-0">
              <router-link to="/register">Register a new account</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-image {
  background-image: url('/img/bg2.jpg') !important;
  background-size: cover;
}
</style>
