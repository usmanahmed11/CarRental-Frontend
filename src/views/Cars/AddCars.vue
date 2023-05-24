<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent class="main-sidebar" />

    <div class="content-wrapper">
      <div class="d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Add New Car</h3>
            </div>

            <form class="form-label-left" @submit="handleSubmit" autocomplete="off">
              <div class="card-body">
                <div class="form-group">
                  <label for="carTitle">Car Title:</label>
                  <input
                    type="text"
                    id="carTitle"
                    v-model="carTitle"
                    :class="{ 'is-invalid': carTitleError }"
                    class="form-control"
                    placeholder="Car Title"
                  />
                  <div v-if="carTitleError" class="invalid-feedback d-block font color">
                    {{ carTitleError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="subTitle">Sub Title:</label>
                  <select id="subTitle" v-model="subTitle" class="form-control">
                    <option value="Compact">Compact</option>
                    <option value="Premium">Premium</option>
                    <option value="Luxury">Luxury</option>
                    <option value="SportsCar">Sports Car</option>
                  </select>
                  <div v-if="subTitleError" class="invalid-feedback d-block font color">
                    {{ subTitleError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="price">Price /hr:</label>
                  <input
                    type="number"
                    id="price"
                    v-model="price"
                    :class="{ 'is-invalid': priceError }"
                    class="form-control"
                    
                  />
                  <div v-if="priceError" class="invalid-feedback d-block font color">
                    {{ priceError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="doors">Doors:</label>
                  <input
                    type="number"
                    id="doors"
                    v-model="doors"
                    :class="{ 'is-invalid': doorError }"
                    class="form-control"
                    placeholder="Doors"
                  />
                  <div v-if="doorError" class="invalid-feedback d-block font color">
                    {{ doorError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="passengers">Passengers:</label>
                  <input
                    type="number"
                    id="passengers"
                    v-model="passengers"
                    :class="{ 'is-invalid': passengerError }"
                    class="form-control"
                    placeholder="Passengers"
                  />
                  <div v-if="passengerError" class="invalid-feedback d-block font color">
                    {{ passengerError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="luggage">Luggage:</label>
                  <input
                    type="text"
                    id="luggage"
                    v-model="luggage"
                    :class="{ 'is-invalid': luggageError }"
                    class="form-control"
                    placeholder="Luggage"
                  />
                  <div v-if="luggageError" class="invalid-feedback d-block font color">
                    {{ luggageError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="transmission">Transmission:</label>
                  <select id="transmission" v-model="transmission" class="form-control">
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                  <div v-if="transmissionError" class="invalid-feedback d-block font color">
                    {{ transmissionError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="airConditioning">Air Conditioning:</label>
                  <select id="airConditioning" v-model="airConditioning" class="form-control">
                    <option value="single zone">Single Zone</option>
                    <option value="dual zone">Dual Zone</option>
                  </select>
                  <div v-if="airConditioningError" class="invalid-feedback d-block font color">
                    {{ airConditioningError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="picture">Car Picture</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        id="picture"
                        name="picture"
                        @change="handleFileChange"
                        :class="{ 'form-control': true, 'is-invalid': pictureError }"
                        class="form-control has-feedback-left"
                      />

                      <span class="fa fa-picture-o form-control-feedback left"></span>
                    </div>
                    <div class="invalid-feedback d-block font">
                      <p v-if="pictureError" style="color: red">{{ pictureError }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <router-link to="/dashboard">
                  <button class="btn btn-primary button" type="button">Cancel</button>
                </router-link>
                <button type="submit" class="btn btn-success">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarComponent from '../../components/SidebarComponent.vue'
import TopNavigationComponent from '../../components/TopNavigationComponent.vue'
import axios from 'axios'
import { ref } from 'vue'
import API_URL from '../../config'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  components: {
    SidebarComponent,
    TopNavigationComponent
  },

  setup() {
    const carTitle = ref('')
    const subTitle = ref('Compact')
    const price = ref(0)
    const doors = ref(0)
    const passengers = ref(0)
    const luggage = ref('')
    const transmission = ref('Automatic')
    const airConditioning = ref('single zone')
    const picture = ref(null)

    const carTitleError = ref(null)
    const subTitleError = ref(null)
    const priceError = ref(null)
    const doorError = ref(null)
    const passengerError = ref(null)
    const luggageError = ref(null)
    const transmissionError = ref(null)
    const airConditioningError = ref(null)
    const pictureError = ref(null)

    const handleFileChange = (event) => {
      picture.value = event.target.files[0]
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      carTitleError.value = null
      subTitleError.value = null
      priceError.value = null
      doorError.value = null
      passengerError.value = null
      luggageError.value = null
      transmissionError.value = null
      airConditioningError.value = null
      pictureError.value = null

      if (!carTitle.value) {
        carTitleError.value = 'Car Title is required'
      }
      if (!subTitle.value) {
        subTitleError.value = 'Sub Title is required'
      }
      if (!price.value) {
        priceError.value = 'Price is required'
      }
      if (!doors.value) {
        doorError.value = 'Doors Value is required'
      }
      if (!passengers.value) {
        passengerError.value = 'Passengers Value is required'
      }
      if (!luggage.value) {
        luggageError.value = 'Luggage Value is required'
      }
      if (!transmission.value) {
        transmissionError.value = 'Transmission Value is required'
      }
      if (!airConditioning.value) {
        airConditioningError.value = 'Air Conditioning Value is required'
      }
      if (!picture.value) {
        pictureError.value = 'Picture Value is required'
      }
      if (
        !carTitle.value ||
        !subTitle.value ||
        !price.value ||
        !doors.value ||
        !passengers.value ||
        !luggage.value ||
        !transmission.value ||
        !airConditioning.value ||
        !picture.value
      ) {
        return
      }

      let formData = new FormData()
      formData.append('carTitle', carTitle.value)
      formData.append('subTitle', subTitle.value)
      formData.append('price', price.value)
      formData.append('doors', doors.value)
      formData.append('passengers', passengers.value)
      formData.append('luggage', luggage.value)
      formData.append('transmission', transmission.value)
      formData.append('airConditioning', airConditioning.value)
      formData.append('picture', picture.value, picture.value.name)
      try {
        const response = await axios.post(`${API_URL}/cars`, formData)
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
          carTitle.value = ''
          subTitle.value = ''
          price.value = 0
          doors.value = 0
          passengers.value = 0
          luggage.value = ''
          transmission.value = ''
          airConditioning.value = ''
          picture.value = null
        }
      } catch (error) {
        toast.error('An error occurred while adding the car', {
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
      carTitle,
      subTitle,
      price,
      doors,
      passengers,
      luggage,
      transmission,
      airConditioning,
      picture,
      carTitleError,
      subTitleError,
      priceError,
      doorError,
      passengerError,
      luggageError,
      transmissionError,
      airConditioningError,
      pictureError,
      handleSubmit,
      handleFileChange
    }
  }
}
</script>

<style>
.color {
  color: red;
}
.font {
  font-size: 1rem !important;
}
</style>
