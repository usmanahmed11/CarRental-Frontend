<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent />

    <div class="content-wrapper">
      <div class="d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Edit Service</h3>
            </div>

            <form class="form-label-left" @submit="handleSubmit" autocomplete="off">
              <div class="card-body">
                <div class="form-group">
                  <label for="blogTitle">Service Name:</label>
                  <input
                    type="text"
                    id="serviceName"
                    v-model="service.serviceName"
                    :class="{ 'is-invalid': serviceError }"
                    class="form-control"
                    placeholder="Service Name"
                  />
                  <div v-if="serviceError" class="invalid-feedback d-block font color">
                    {{ serviceError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="Service Description">Service Description:</label>
                  <input
                    type="text"
                    id="serviceDescription"
                    v-model="service.serviceDescription"
                    :class="{ 'is-invalid': serviceDescriptionError }"
                    class="form-control"
                    placeholder="Service Description"
                  />
                  <div v-if="serviceDescriptionError" class="invalid-feedback d-block font color">
                    {{ serviceDescriptionError }}
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
import API_URL from '@/config'
import SidebarComponent from '@/components/SidebarComponent.vue'
import TopNavigationComponent from '@/components/TopNavigationComponent.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'

export default {
  components: {
    SidebarComponent,
    TopNavigationComponent
  },

  setup() {
    const serviceId = ref(null)

    const service = ref({
      serviceName: '',
      serviceDescription: ''
    })
    const serviceError = ref(null)
    const serviceDescriptionError = ref(null)

    const router = useRouter()
    const fetchServices = async () => {
      try {
        serviceId.value = router.currentRoute.value.params.id
        const response = await axios.get(`${API_URL}/services/${serviceId.value}/show`)
        const serviceData = response.data
        service.value = {
          serviceName: serviceData.name,
          serviceDescription: serviceData.description
        }
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      fetchServices()
    })

    const handleSubmit = async (e) => {
      e.preventDefault()

      serviceError.value = null
      serviceDescriptionError.value = null

      if (!service.value.serviceName) {
        serviceError.value = 'Service Name is required'
      }
      if (!service.value.serviceDescription) {
        serviceDescriptionError.value = 'Service Description is required'
      }

      if (!service.value.serviceName || !service.value.serviceDescription) {
        return
      }

      let formData = new FormData()
      formData.append('serviceName', service.value.serviceName)
      formData.append('serviceDescription', service.value.serviceDescription)
      try {
        const response = await axios.post(`${API_URL}/services/${serviceId.value}`, formData)
        if (response.status === 200) {
          toast.success(response.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
        }
      } catch (error) {
        toast.error('An error occurred while Updating the Service', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      }
    }

    return {
      service,
      serviceDescriptionError,
      serviceError,
      handleSubmit
    }
  }
}
</script>

<style>
.booking-container {
  display: flex;
}

.booking-form {
  flex: 1;
}

.booking-details {
  flex: 1;
  margin-left: 20px;
}
</style>
