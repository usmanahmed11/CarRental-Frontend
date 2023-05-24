<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent />
    <div class="content-wrapper">
      <div class="form-wrapper">
        <div class="col-md-6">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Update Profile</h3>
            </div>

            <form class="form-label-left" @submit="handleSubmit" autocomplete="off">
              <div class="card-body">
                <div class="form-group">
                  <label for="Name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    v-model="name"
                    @input="handleNameChange"
                    :class="{ 'is-invalid': nameError }"
                    class="form-control has-feedback-left"
                    placeholder="Name"
                  />
                  <div v-if="nameError" class="invalid-feedback d-block">
                    {{ nameError }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="Email">Email</label>
                  <input
                    type="text"
                    :disabled="true"
                    :value="email"
                    class="form-control has-feedback-left"
                  />
                </div>
                <div class="form-group">
                  <label for="profilePicture">Profile Picture</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        @change="handleProfilePictureChange"
                        :class="{ 'form-control': true, 'is-invalid': profileError }"
                        class="form-control has-feedback-left"
                      />

                      <span class="fa fa-picture-o form-control-feedback left"></span>
                    </div>
                    <div class="invalid-feedback d-block font">
                      <p v-if="profileError" style="color: red">{{ profileError }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer">
                <router-link to="/dashboard">
                  <button class="btn btn-primary button" type="button">Cancel</button>
                </router-link>
                <button type="submit" class="btn btn-success">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import API_URL from '../../config'
import SidebarComponent from '../../components/SidebarComponent.vue'
import TopNavigationComponent from '../../components/TopNavigationComponent.vue'
import Cookies from 'js-cookie'

export default {
  components: {
    SidebarComponent,
    TopNavigationComponent
  },
  setup() {
    const name = ref('')
    const email = ref('')
    const profilePicture = ref(null)
    const nameError = ref(null)
    const profileError = ref(null)

    const handleNameChange = (e) => {
      name.value = e.target.value
    }

    const handleProfilePictureChange = (e) => {
      profilePicture.value = e.target.files[0]
    }

    const accessToken = Cookies.get('access_token')

    const handleSubmit = (e) => {
      e.preventDefault()

      nameError.value = null
      profileError.value = null

      if (!name.value) {
        nameError.value = 'Name is required'
      }
      if (!profilePicture.value) {
        profileError.value = 'Profile picture is required'
      }

      if (!name.value || !profilePicture.value) {
        return
      }

      let formData = new FormData()
      formData.append('name', name.value)
      formData.append('profile_picture', profilePicture.value, profilePicture.value.name)

      // Only make the API call if both name and profilePicture are present
      if (name.value && profilePicture.value) {
        try {
          axios
            .post(API_URL + '/update-profile', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
              }
            })
            .then((response) => {
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
            })
            .catch((err) => {
              toast.error(err.response.data.error, {
                position: 'top-right',
                duration: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored'
              })
            })
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
    }

    const getUser = async () => {
      try {
        const response = await axios.get(API_URL + '/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        email.value = response.data.email
        name.value = response.data.name
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(getUser)

    return {
      name,
      email,
      profilePicture,
      nameError,
      profileError,
      handleNameChange,
      handleProfilePictureChange,
      handleSubmit
    }
  }
}
</script>

<style>
.button {
  margin-right: 10px;
}

.font {
  font-size: 1rem !important;
}
</style>
