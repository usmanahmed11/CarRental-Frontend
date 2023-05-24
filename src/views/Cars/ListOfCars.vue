<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent class="" />
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><strong>List Of Cars</strong></h3>
            </div>
            <div class="card-body">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="car in cars" :key="car.id">
                    <td>{{ car.id }}</td>
                    <td>
                      <img
                        :src="`http://localhost:8000/storage/${car.picture}`"
                        alt="Car Picture"
                        width="100"
                      />
                    </td>
                    <td>{{ car.carTitle }}</td>
                    <td>{{ car.created_at }}</td>
                    <td>
                      <button @click="editCar(car.id)" class="btn btn-primary">Edit</button>
                      <button @click="deleteCar(car.id)" class="btn btn-danger">Delete</button>
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
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import the useRouter function
import SidebarComponent from '../../components/SidebarComponent.vue';
import TopNavigationComponent from '../../components/TopNavigationComponent.vue';
import API_URL from '../../config';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    SidebarComponent,
    TopNavigationComponent
  },
  setup() {
    const cars = ref([]);
    const router = useRouter(); // Access the router instance

    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/listofcars`);
        cars.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const deleteCar = async (carId) => {
      try {
        const response = await axios.delete(`${API_URL}/cars/${carId}`);
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
          });
          fetchCars();
        }
      } catch (error) {
        toast.error('An error occurred while deleting the car', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
      }
    };

    const editCar = (carId) => {
  router.push({ name: 'EditCar', params: { id: carId } });
};


    onMounted(() => {
      fetchCars();
    });

    return {
      cars,
      deleteCar,
      editCar
    };
  }
};
</script>
