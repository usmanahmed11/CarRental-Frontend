<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent />
    <div class="content-wrapper">
      <div class="form-wrapper">
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Change Password</h3>
            </div>

            <form
              class="form-label-left"
              @submit="handleSubmit"
              autocomplete="off"
            >
              <div class="card-body">
                <div class="form-group">
                  <label for="oldPassword">Old Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    :class="`form-control ${oldPasswordError ? 'is-invalid' : ''} has-feedback-left`"
                    placeholder="Old Password"
                  />
                  <div v-if="oldPasswordError" class="invalid-feedback d-block font errorColor">
                    {{ oldPasswordError }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    :class="`form-control ${passwordError ? 'is-invalid' : ''} has-feedback-left`"
                    placeholder="Password"
                  />
                  <div v-if="passwordError" class="invalid-feedback d-block font errorColor">
                    {{ passwordError }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="passwordConfirmation">Confirm Password</label>
                  <input
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    :class="`form-control ${passwordConfirmationError ? 'is-invalid' : ''} has-feedback-left`"
                    placeholder="Confirm Password"
                  />
                  <div v-if="passwordConfirmationError" class="invalid-feedback d-block font errorColor">
                    {{ passwordConfirmationError }}
                  </div>
                </div>

              </div>

              <div class="card-footer">
                <router-link to="/dashboard">
                  <button
                    class="btn btn-primary"
                    type="button"
                    style="margin-right: 10px"
                  >
                    Cancel
                  </button>
                </router-link>
                <button type="submit" class="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import API_URL from "../../config";
import SidebarComponent from '../../components/SidebarComponent.vue'
import TopNavigationComponent from '../../components/TopNavigationComponent.vue'
import Cookies from 'js-cookie'

export default {
  components: {
    SidebarComponent,
    TopNavigationComponent
  },
  setup() {
    
    const oldPasswordError = ref(null)
    const passwordError = ref(null)
    const passwordConfirmationError = ref(null)
    
    const accessToken = Cookies.get('access_token')

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target)
      const oldPassword = formData.get("oldPassword");
      const password = formData.get('password')
      const passwordConfirmation = formData.get('passwordConfirmation')
      oldPasswordError.value = null;
      passwordError.value = null;
      passwordConfirmationError.value = null;

      if (!oldPassword) {
        oldPasswordError.value = "Old Password is required";
      }

      if (!password) {
        passwordError.value = "Password is required";
      }

      if (!passwordConfirmation) {
        passwordConfirmationError.value = "Password Confirmation is required";
      }

      if (password !== passwordConfirmation) {
        passwordConfirmationError.value = "Password and Confirm-Password do not match";
      }

      if (!oldPassword || !password || !passwordConfirmation) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      try {
        const response = await axios.post(
          API_URL + "/change-password",
          {
            old_password: oldPassword,
            password: password,
            password_confirmation: passwordConfirmation
          },
          config
        );

        if (response.status === 200) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        }
      } catch (error) {
        const errors = error.response.data.error;

        if (Array.isArray(errors)) {
          errors.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
          });
        } else {
          toast.error(errors, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        }
      }
    };

    return {
      handleSubmit,
      oldPasswordError,
      passwordError,
      passwordConfirmationError,

    };
  }
};
</script>


<style>
.errorColor {
  color: red;
}

.font {
  font-size: 1rem !important;
}
</style>
