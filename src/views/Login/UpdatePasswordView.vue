<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import API_URL from '../../config'
import { useRouter } from 'vue-router'

export default {
  name: 'UpdatePasswordView',
  setup() {
    const token = ref('')
    const passwordError = ref(null)
    const passwordConfirmationError = ref(null)
    const router = useRouter()

    onMounted(() => {
      const tokenFromURL = router.currentRoute.value.query.token
      token.value = tokenFromURL
    })

    const handleSubmit = async (event) => {
      event.preventDefault()
      const formData = new FormData(event.target)
      const password = formData.get('password')
      const passwordConfirmation = formData.get('passwordConfirmation')

      passwordError.value = null
      passwordConfirmationError.value = null

      if (!password) {
        passwordError.value = 'Password is required'
      }

      if (!passwordConfirmation) {
        passwordConfirmationError.value = 'Password Confirmation is required'
      }

      if (password !== passwordConfirmation) {
        passwordConfirmationError.value = 'Password and Confirm-Password do not match'
        return
      }

      if (!password || !passwordConfirmation) {
        return
      }

      try {
        const response = await axios.post(API_URL + '/password/reset', {
          password,
          password_confirmation: passwordConfirmation,
          token: token.value
        })

        if (response.status === 200) {
          toast.success(response.data.message, {
            position: 'top-right',
            duration: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored'
          })
        }
      } catch (error) {
        const errors = error.response.data.error
        if (Array.isArray(errors)) {
          errors.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: 'top-right',
              duration: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'colored'
            })
          })
        } else {
          toast.error(errors, {
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
    }

    return {
      handleSubmit,
      passwordError,
      passwordConfirmationError
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
            <router-link to="/login" class="h1"> <b>Car</b>Rental </router-link>
          </div>
          <div class="card-body">
            <p class="login-box-msg">
              You are only one step away from your new password, recover your password now.
            </p>
            <form @submit="handleSubmit">
              <div class="input-group mb-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  :class="{
                    'form-control is-invalid': passwordError,
                    'form-control': !passwordError
                  }"
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
              <div class="input-group mb-3">
                <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  :class="{
                    'form-control is-invalid': passwordConfirmationError,
                    'form-control': !passwordConfirmationError
                  }"
                  placeholder="Confirm Password"
                  v-model="passwordConfirmation"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <p v-if="passwordConfirmationError" style="color: red">
                {{ passwordConfirmationError }}
              </p>
              <div class="row">
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-block">Change password</button>
                </div>
              </div>
            </form>

            <p class="mt-3 mb-1">
              <router-link to="/login">Login</router-link>
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
