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
                  <form class="form-horizontal">
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

                    <router-link to="/dashboard">
                      <button class="btn btn-primary button" type="button">Cancel</button>
                    </router-link>

                    <stripe-checkout
                      ref="checkoutRef"
                      mode="payment"
                      :pk="publishableKey"
                      :line-items="lineItems"
                      :success-url="successURL"
                      :cancel-url="cancelURL"
                      @loading="(v) => (loading = v)"
                    />
                    <button @click="stripePayment" class="stripe-button">Pay now!</button>

                    <button @click="handleSubmit" class="paypal-button">
                      <i class="paypal-logo">Pay</i><i class="paypal-logo">Pal</i>
                    </button>
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
                    <p><strong>Price:</strong> {{ getPrice() }} $ /hr</p>
                    <p><strong>Total Bill:</strong> {{ calculateBill.toFixed(0) }} $</p>
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
import { useRouter, useRoute } from 'vue-router'
import { StripeCheckout } from '@vue-stripe/vue-stripe'

export default {
  components: {
    SidebarComponent,
    TopNavigationComponent,
    StripeCheckout
  },

  setup() {
    const booking = ref({
      name: '',
      phone: '',
      email: '',
      departureDateTime: '',
      returnDateTime: '',
      car: ''
    })
    const { localStorage } = window

    const cars = ref([])
    const nameError = ref(null)
    const phoneError = ref(null)
    const emailError = ref(null)
    const datetimeError = ref(null)
    const returnDateTimeError = ref(null)
    const carError = ref(null)
    const route = useRoute()
    const router = useRouter()
    const checkoutRef = ref(null)
    const publishableKey =
      'pk_test_51NE6AVBIPVlJ4mt0xjpNsBF37Dus99OLspog6U4DYOlGa7XTmZumxf3KGzJXCuSGm1C7jv7sCxZatK3fw6jA66CD004S3P4pqS'
    const loading = ref(false)
    const lineItems = ref([
      {
        price: 'price_1NEULNBIPVlJ4mt0gdE7eDk8',
        quantity: 1
      }
    ])
    const successURL = ref('http://localhost:5173/car-booking?success=true')
    const cancelURL = ref('http://localhost:5173/car-booking')

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

    const stripePayment = async (e) => {
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

      const totalBill = calculateBill.value.toFixed(0)

      const bookingData = {
        ...booking.value,
        totalBill: totalBill
      }
      localStorage.setItem('booking', JSON.stringify(bookingData))

      checkoutRef.value.redirectToCheckout()
    }

    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/listofcars`)
        cars.value = response.data
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      const paymentSuccess = route.query.success === 'true'

      if (paymentSuccess) {
        const bookingData = JSON.parse(localStorage.getItem('booking'))

        if (bookingData) {
          axios
            .post(`${API_URL}/paymentStripe`, bookingData)
            .then((response) => {
              if (response.status === 200) {
                toast.success('Your Booking Has Been Successful', {
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
            })
            .catch((error) => {
              console.error(error)
            })
          localStorage.removeItem('booking')
        }
      }
    })

    onMounted(() => {
      fetchCars()

      const paymentSuccess = route.query.success === 'truee'
      const paymentFailure = route.query.success === 'falsee'

      if (paymentSuccess) {
        toast.success('Your Booking Has Been Successful', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        router.replace({ query: { ...route.query, success: undefined } })
      } else if (paymentFailure) {
        toast.error('Booking failed. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        router.replace({ query: { ...route.query, success: undefined } })
      }
    })

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
      formData.append('totalBill', calculateBill.value.toFixed(0))

      try {
        const response = await axios.post(`${API_URL}/payment/initiate`, formData)

        if (response.status === 200) {
          const data = response.data.redirect_url
          window.location.href = data
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
      carError,
      publishableKey,
      loading,
      lineItems,
      successURL,
      cancelURL,
      stripePayment,
      checkoutRef
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
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.paypal-logo {
  font-family: Verdana, Tahoma;
  font-weight: bold;
  font-size: 26px;
  color: #253b80;
}

.paypal-button {
  padding: 5px 5px;
  border: 1px solid #ff9933;
  border-radius: 5px;
  background-image: linear-gradient(#fff0a8, #f9b421);
  margin: 0 auto;
  min-width: 138px;
  position: relative;
}

.paypal-button .paypal-logo {
  display: inline-block;
  text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.6);
  font-size: 20px;
}
.stripe-button {
  display: inline-block;
  background-color: #6772e5;
  color: #fff;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.stripe-button:hover {
  background-color: #5773e6;
}

.stripe-button:active {
  background-color: #4767d1;
}
</style>
