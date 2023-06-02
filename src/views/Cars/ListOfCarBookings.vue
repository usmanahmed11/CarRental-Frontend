<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent />
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><strong>List Of Bookings</strong></h3>
            </div>
            <div class="card-body">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Car</th>
                    <th>Booking Date</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="booking in bookings" :key="booking.id">
                    <td>{{ booking.name }}</td>
                    <td>
                      {{ booking.phone }}
                    </td>
                    <td>{{ booking.car }}</td>
                    <td>
                      {{
                        new Date(booking.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      }}
                    </td>
                    <td>{{ booking.payment_status }}</td>

                    <td>
                      <button @click="editBooking(booking.id)" class="btn btn-primary">Edit</button>
                      <button @click="deleteBooking(booking.id)" class="btn btn-danger">
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
    const bookings = ref([])
    const router = useRouter()

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_URL}/listofcarbookings`)
        bookings.value = response.data
      } catch (error) {
        console.error(error)
      }
    }

    const deleteBooking = async (bookingId) => {
      try {
        const response = await axios.delete(`${API_URL}/bookings/${bookingId}`)
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
          fetchBookings()
        }
      } catch (error) {
        toast.error('An error occurred while deleting the Booking', {
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

    const editBooking = (bookingId) => {
      router.push({ name: 'EditBooking', params: { id: bookingId } })
    }

    onMounted(() => {
      fetchBookings()
    })

    return {
      bookings,
      deleteBooking,
      editBooking
    }
  }
}
</script>
