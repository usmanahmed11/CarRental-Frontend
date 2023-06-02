<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent class="main-sidebar" />
    <div class="content-wrapper">
      <div class="d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Cab Booking</h3>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <form @submit.prevent="handleSubmit" class="form-horizontal">
                    <div class="form-group">
                      <label for="name">Name:</label>
                      <input
                        type="text"
                        id="name"
                        v-model="booking.name"
                        class="form-control"
                        :class="{ 'is-invalid': nameError }"
                        placeholder="Name"
                      />
                      <div v-if="nameError" class="invalid-feedback d-block font color">
                        {{ nameError }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="phone">Phone Number:</label>
                      <input
                        type="tel"
                        id="phone"
                        v-model="booking.phone"
                        class="form-control"
                        :class="{ 'is-invalid': phoneError }"
                        placeholder="Phone Number"
                      />
                      <div v-if="phoneError" class="invalid-feedback d-block font color">
                        {{ phoneError }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        v-model="booking.email"
                        class="form-control"
                        :class="{ 'is-invalid': emailError }"
                        placeholder="Email"
                      />
                      <div v-if="emailError" class="invalid-feedback d-block font color">
                        {{ emailError }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="departure-date">Departure Date and Time:</label>
                      <input
                        type="datetime-local"
                        id="departure-date"
                        v-model="booking.departureDateTime"
                        class="form-control"
                        :class="{ 'is-invalid': datetimeError }"
                      />
                      <div v-if="datetimeError" class="invalid-feedback d-block font color">
                        {{ datetimeError }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="return-date">Return Date and Time:</label>
                      <input
                        type="datetime-local"
                        id="return-date"
                        v-model="booking.returnDateTime"
                        class="form-control"
                        :class="{ 'is-invalid': returnDateTimeError }"
                      />
                      <div v-if="returnDateTimeError" class="invalid-feedback d-block font color">
                        {{ returnDateTimeError }}
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="cars">Cars:</label>
                      <select
                        id="cars"
                        v-model="booking.car"
                        class="form-control"
                        :class="{ 'is-invalid': carError }"
                      >
                        <option value="">Select a car</option>
                        <option v-for="car in cars" :value="car.carTitle" :key="car.id">
                          {{ car.carTitle }}
                        </option>
                      </select>
                      <div v-if="carError" class="invalid-feedback d-block font color">
                        {{ carError }}
                      </div>
                    </div>
                    <div class="card-footer">
                      <router-link to="/dashboard">
                        <button class="btn btn-primary button" type="button">Cancel</button>
                      </router-link>
                      <button type="submit" class="btn btn-success">Confirm</button>
                    </div>
                  </form>
                </div>
                <div class="col-md-6">
                  <div class="booking-details">
                    <h2>Booking Details</h2>
                    <p><strong> Name:</strong> {{ booking.name }}</p>
                    <p><strong>Phone Number:</strong> {{ booking.phone }}</p>
                    <p><strong>Email:</strong> {{ booking.email }}</p>
                    <p><strong>Departure Date and Time:</strong> {{ booking.departureDateTime }}</p>
                    <p><strong>Return Date and Time: </strong>{{ booking.returnDateTime }}</p>
                    <p><strong>Car:</strong> {{ booking.car }}</p>
                    <p><strong>Price:</strong> {{ getPrice() }} Rs /hr</p>
                    <p><strong>Total Bill:</strong> {{ calculateBill.toFixed(0) }} Rs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
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
    const bookingId = ref(null)

    const booking = ref({
      name: '',
      phone: '',
      email: '',
      departureDateTime: '',
      returnDateTime: '',
      car: ''
    })
    const cars = ref([])
    const nameError = ref(null)
    const phoneError = ref(null)
    const emailError = ref(null)
    const datetimeError = ref(null)
    const returnDateTimeError = ref(null)
    const carError = ref(null)

    const fetchCar = async () => {
      try {
        const response = await axios.get(`${API_URL}/listofcars`)
        cars.value = response.data
      } catch (error) {
        console.error(error)
      }
    }

    const router = useRouter()
    const fetchBooking = async () => {
      try {
        bookingId.value = router.currentRoute.value.params.id
        const response = await axios.get(`${API_URL}/bookings/${bookingId.value}/show`)
        const bookingData = response.data
        booking.value = {
          name: bookingData.name,
          phone: bookingData.phone,
          email: bookingData.email,
          departureDateTime: bookingData.departure_date,
          returnDateTime: bookingData.return_date,
          car: bookingData.car
        }
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      fetchBooking()
      fetchCar()
    })

    const calculateBill = computed(() => {
      const selectedCar = cars.value.find((car) => car.carTitle === booking.value.car)
      if (selectedCar) {
        const departure = new Date(booking.value.departureDateTime)
        const returnDate = new Date(booking.value.returnDateTime)
        const hours = Math.abs(returnDate - departure) / 36e5
        return selectedCar.price * hours
      }
      return 0
    })
    const getPrice = () => {
      const selectedCar = cars.value.find((car) => car.carTitle === booking.value.car)
      return selectedCar ? selectedCar.price : ''
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      nameError.value = null
      phoneError.value = null
      emailError.value = null
      datetimeError.value = null
      returnDateTimeError.value = null
      carError.value = null

      if (!booking.value.name) {
        nameError.value = 'Name is required'
      }
      if (!booking.value.phone) {
        phoneError.value = 'Phone No is required'
      }
      if (!booking.value.email) {
        emailError.value = 'Email is required'
      }
      if (!booking.value.departureDateTime) {
        datetimeError.value = 'Departure Date & Time is required'
      }
      if (!booking.value.returnDateTime) {
        returnDateTimeError.value = 'Return Date & Time is required'
      }
      if (!booking.value.car) {
        carError.value = 'Please Select a Car For Checkout'
      }

      if (
        !booking.value.name ||
        !booking.value.phone ||
        !booking.value.email ||
        !booking.value.departureDateTime ||
        !booking.value.returnDateTime ||
        !booking.value.car
      ) {
        return
      }

      let formData = new FormData()
      formData.append('name', booking.value.name)
      formData.append('phone', booking.value.phone)
      formData.append('email', booking.value.email)
      formData.append('departure-date', booking.value.departureDateTime)
      formData.append('return-date', booking.value.returnDateTime)
      formData.append('cars', booking.value.car)
      formData.append('total-bill', calculateBill.value.toFixed(0))

      try {
        const response = await axios.post(`${API_URL}/bookings/${bookingId.value}`, formData)
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
        toast.error('An error occurred while booking the car', {
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
      booking,
      cars,
      handleSubmit,
      getPrice,
      calculateBill,
      nameError,
      phoneError,
      emailError,
      datetimeError,
      returnDateTimeError,
      carError
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
