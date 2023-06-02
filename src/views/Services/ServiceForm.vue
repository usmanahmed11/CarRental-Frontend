<template>
    <div class="wrapper">
      <TopNavigationComponent />
      <SidebarComponent />
  
      <div class="content-wrapper">
        <div class="d-flex justify-content-center">
          <div class="col-md-10">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Add New Service</h3>
              </div>
  
              <form class="form-label-left" @submit="handleSubmit" autocomplete="off">
                <div class="card-body">
                  <div class="form-group">
                    <label for="blogTitle">Service Name:</label>
                    <input
                      type="text"
                      id="serviceName"
                      v-model="serviceName"
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
                      v-model="serviceDescription"
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
  import SidebarComponent from '@/components/SidebarComponent.vue'
  import TopNavigationComponent from '@/components/TopNavigationComponent.vue'
  import axios from 'axios'
  import { ref } from 'vue'
  import API_URL from '@/config'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  
  export default {
    components: {
      SidebarComponent,
      TopNavigationComponent
    },
  
    setup() {
      const serviceName = ref('')
     
      const serviceDescription = ref('')
  
      const serviceError = ref(null)
      const serviceDescriptionError = ref(null)
    
  
      const handleSubmit = async (e) => {
        e.preventDefault()
  
        serviceError.value = null
        serviceDescriptionError.value = null
       
  
        if (!serviceName.value) {
            serviceError.value = 'Service Name is required'
        }
        if (!serviceDescription.value) {
            serviceDescriptionError.value = 'Service Description is required'
        }
     
        if (!serviceName.value || !serviceDescription.value) {
          return
        }
  
        let formData = new FormData()
        formData.append('serviceName', serviceName.value)
        formData.append('serviceDescription', serviceDescription.value)
        try {
          const response = await axios.post(`${API_URL}/services`, formData)
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
            
            serviceName.value = ''
            serviceDescription.value = ''
           
          }
        } catch (error) {
          toast.error('An error occurred while adding the service', {
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
        serviceDescription,
        serviceName,
        serviceDescriptionError,
        serviceError,
        handleSubmit,
        
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
  