<script>
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import API_URL from '../../config'

export default {
  name: 'RegisterView',
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const passwordConfirmation = ref('')
    const nameError = ref(null)
    const emailError = ref(null)
    const passwordError = ref(null)
    const passwordConfirmationError = ref(null)
    const loading = ref(false)

    const handleSubmit = async (event) => {
      event.preventDefault()
      loading.value = true

      nameError.value = null
      emailError.value = null
      passwordError.value = null
      passwordConfirmationError.value = null

      if (!name.value) {
        nameError.value = 'Name is required'
      }
      if (!email.value) {
        emailError.value = 'Email is required'
      }
      if (!password.value) {
        passwordError.value = 'Password is required'
      }
      if (!passwordConfirmation.value) {
        passwordConfirmationError.value = 'Password Confirmation is required'
      }

      if (password.value !== passwordConfirmation.value) {
        passwordConfirmationError.value = 'Password and Confirm-Password do not match'
      }

      if (!name.value || !email.value || !password.value || !passwordConfirmation.value) {
        loading.value = false
        return
      }

      try {
        const response = await axios.post(API_URL + '/register', {
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: passwordConfirmation.value
        })

        if (response.status === 200) {
          loading.value = false
          toast.success(response.data.message, {
            position: 'top-right',
            timeout: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored'
          })
        }
      } catch (err) {
        loading.value = false
        const errors = err.response.data.error
        Object.values(errors).forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: 'top-right',
            timeout: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored'
          })
        })
      }
    }

    return {
      name,
      email,
      password,
      passwordConfirmation,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      handleSubmit,
      loading
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
          <p class="login-box-msg">Register a new account</p>

          <form @submit="handleSubmit" autocomplete="off">
            <div class="input-group mb-3">
              <input
                type="name"
                id="name"
                name="name"
                v-model="name"
                :class="{ 'form-control': true, 'is-invalid': nameError }"
                placeholder="Full Name"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <p v-if="nameError" style="color: red">{{ nameError }}</p>
            <div class="input-group mb-3">
              <input
                type="email"
                id="email"
                name="email"
                v-model="email"
                :class="{ 'form-control': true, 'is-invalid': emailError }"
                placeholder="Email"
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
                v-model="password"
                :class="{ 'form-control': true, 'is-invalid': passwordError }"
                placeholder="Password"
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
                v-model="passwordConfirmation"
                :class="{ 'form-control': true, 'is-invalid': passwordConfirmationError }"
                placeholder="Confirm Password"
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
              <div class="col-8"></div>

              <div class="col-4">
                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                  :value="loading ? 'Loading...' : 'Submit'"
                  :disabled="loading"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
          <p class="mb-0">
            <router-link to="/login">I already have an account</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.background-image {
  background-image: url('/img/bg3.jpg') !important;
  background-size: cover;
}
</style>