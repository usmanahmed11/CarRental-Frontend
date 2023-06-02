<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent />
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><strong>List Of Services</strong></h3>
            </div>
            <div class="card-body">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th> 
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="service in services" :key="service.id">
                    <td>{{ service.name }}</td>
                    <td>{{ service.description }}</td>

                    <td>
                      <button @click="editBooking(service.id)" class="btn btn-primary">Edit</button>
                      <button @click="deleteBooking(service.id)" class="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SidebarComponent from '@/components/SidebarComponent.vue'
import TopNavigationComponent from '@/components/TopNavigationComponent.vue'
import API_URL from '@/config'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  components: {
    SidebarComponent,
    TopNavigationComponent
  },
  setup() {
    const services = ref([])
    const router = useRouter()

    const fetchservices = async () => {
      try {
        const response = await axios.get(`${API_URL}/listofservices`)
        services.value = response.data
      } catch (error) {
        console.error(error)
      }
    }

    const deleteBooking = async (serviceId) => {
      try {
        const response = await axios.delete(`${API_URL}/services/${serviceId}`)
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
          fetchservices()
        }
      } catch (error) {
        toast.error('An error occurred while deleting the service', {
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

    const editBooking = (serviceId) => {
      router.push({ name: 'EditService', params: { id: serviceId } })
    }

    onMounted(() => {
      fetchservices()
    })

    return {
      services,
      deleteBooking,
      editBooking
    }
  }
}
</script>
