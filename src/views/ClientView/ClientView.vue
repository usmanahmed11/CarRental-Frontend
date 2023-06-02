<template>
  <div class="container-fluid page-header">
    <h1 class="text-uppercase text-primary mb-1">RENTAL CARS</h1>
  </div>
  <!-- About Start -->
  <div class="container-fluid py-5">
    <div class="container pt-5 pb-3">
      <h1 class="display-4 text-uppercase text-center mb-5">
        Welcome To <span class="text-primary">Rental Cars</span>
      </h1>
      <div class="row justify-content-center">
        <div class="col-lg-10 text-center">
          <img class="w-75 mb-4" src="img/about.png" alt="" />
          <p>
            Rental Cars is a leading car rental service provider dedicated to offering convenient
            and reliable transportation solutions to individuals, families, and businesses. With a
            wide range of vehicles available, from compact cars to luxury sedans and SUVs, we ensure
            that our customers have the freedom to choose the perfect rental car that suits their
            needs and preferences. At Rental Cars, we prioritize customer satisfaction and
            convenience. Our user-friendly platform allows users to easily search for available
            rental cars, compare prices, and make secure online bookings. We also provide
            comprehensive information about rental requirements, terms, and conditions to ensure a
            smooth and hassle-free experience for our valued customers.
          </p>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-lg-4 mb-2">
          <div class="d-flex align-items-center bg-light p-4 mb-4" style="height: 150px">
            <div
              class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
              style="width: 100px; height: 100px"
            >
              <i class="fa fa-2x fa-headset text-secondary"></i>
            </div>
            <h4 class="text-uppercase m-0">24/7 Car Rental Support</h4>
          </div>
        </div>
        <div class="col-lg-4 mb-2">
          <div class="d-flex align-items-center bg-secondary p-4 mb-4" style="height: 150px">
            <div
              class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
              style="width: 100px; height: 100px"
            >
              <i class="fa fa-2x fa-car text-secondary"></i>
            </div>
            <h4 class="text-light text-uppercase m-0">Car Reservation Anytime</h4>
          </div>
        </div>
        <div class="col-lg-4 mb-2">
          <div class="d-flex align-items-center bg-light p-4 mb-4" style="height: 150px">
            <div
              class="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
              style="width: 100px; height: 100px"
            >
              <i class="fa fa-2x fa-map-marker-alt text-secondary"></i>
            </div>
            <h4 class="text-uppercase m-0">Lots Of Pickup Locations</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- About End -->

  <!-- Footer Start -->
  <div class="container-fluid bg-secondary py-5 px-sm-3 px-md-5" style="margin-top: 90px">
    <div class="row pt-5">
      <div class="col-lg-3 col-md-6 mb-5">
        <h4 class="text-uppercase text-light mb-4">Get In Touch</h4>
        <p class="mb-2">
          <i class="fa fa-map-marker-alt text-white mr-3"></i>427/428 G4, M.A, Lahore, 54000
        </p>
        <p class="mb-2"><i class="fa fa-phone-alt text-white mr-3"></i>042-35315043 / 46</p>
        <p><i class="fa fa-envelope text-white mr-3"></i>sales@nextbridge.com</p>
        <p><i class="fa fa-envelope text-white mr-3"></i>careers@nextbridge.com</p>
        <h6 class="text-uppercase text-white py-2">Follow Us</h6>
        <div class="d-flex justify-content-start">
          <a class="btn btn-lg btn-dark btn-lg-square mr-2" href="#"
            ><i class="fab fa-twitter"></i
          ></a>
          <a class="btn btn-lg btn-dark btn-lg-square mr-2" href="#"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a class="btn btn-lg btn-dark btn-lg-square mr-2" href="#"
            ><i class="fab fa-linkedin-in"></i
          ></a>
          <a class="btn btn-lg btn-dark btn-lg-square" href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>

      <div class="col-lg-3 col-md-6 mb-5">
        <h4 class="text-uppercase text-light mb-4">Car Gallery</h4>
        <div class="row mx-n1">
          <div class="col-4 px-1 mb-2">
            <a href=""><img class="w-100" src="img/gallery-1.jpg" alt="" /></a>
          </div>
          <div class="col-4 px-1 mb-2">
            <a href=""><img class="w-100" src="img/gallery-2.jpg" alt="" /></a>
          </div>
          <div class="col-4 px-1 mb-2">
            <a href=""><img class="w-100" src="img/gallery-3.jpg" alt="" /></a>
          </div>
          <div class="col-4 px-1 mb-2">
            <a href=""><img class="w-100" src="img/gallery-4.jpg" alt="" /></a>
          </div>
          <div class="col-4 px-1 mb-2">
            <a href=""><img class="w-100" src="img/gallery-5.jpg" alt="" /></a>
          </div>
          <div class="col-4 px-1 mb-2">
            <a href=""><img class="w-100" src="img/gallery-6.jpg" alt="" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid bg-dark py-4 px-sm-3 px-md-5">
    <p class="mb-2 text-center text-body">
      &copy; <a href="#">Rental Cars</a>. All Rights Reserved.
    </p>
  </div>
  <!-- Footer End -->
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import API_URL from '@/config'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
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
    const route = useRoute()
    const router = useRouter()
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/listofcars`)
        cars.value = response.data
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      fetchCars()

      const paymentSuccess = route.query.success === 'true'
      const paymentFailure = route.query.success === 'false'

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
</style>
