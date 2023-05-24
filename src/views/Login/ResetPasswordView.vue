<script>
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import API_URL from '../../config'

export default {
  name: 'ResetPasswordView',
  setup() {
    const email = ref('')
    const emailError = ref(false)
    const loading = ref(false)

    const handleSubmit = async (e) => {
      e.preventDefault()
      loading.value = true
      emailError.value = null

      // validate the form data
      if (!email.value) {
        emailError.value = 'Email is required'
        loading.value = false
        return
      }

      try {
        const response = await axios.post(API_URL + '/password/email', {
          email: email.value
        })

        if (response.status === 200) {
          loading.value = false
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
        loading.value = false
        toast.error(error.response.data.error, {
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

    return {
      email,
      emailError,
      loading,
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
            <router-link to="/login" class="h1"> <b>Car</b>Rental</router-link>
          </div>
          <div class="card-body">
            <p class="login-box-msg">
              You forgot your password? Here you can easily retrieve a new password.
            </p>
            <form @submit="handleSubmit" autocomplete="off">
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
              <div class="row">
                <div class="col-12">
                  <button
                    type="submit"
                    class="btn btn-primary btn-block"
                    :value="loading ? 'Loading...' : 'Submit'"
                    :disabled="loading"
                  >
                    Request new password
                  </button>
                </div>
              </div>
            </form>
            <p class="mt-3 mb-1">
              <router-link to="/login">Log in</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-image {
  background-image: url('/img/bg.jpg') !important;
  background-size: cover;
}
</style>
