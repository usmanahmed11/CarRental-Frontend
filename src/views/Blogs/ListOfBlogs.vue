<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent />
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"><strong>List Of Blogs</strong></h3>
            </div>
            <div class="card-body">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Picture</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="blog in blogs" :key="blog.id">
                    <td>{{ blog.title }}</td>
                    <td>
                      {{ blog.category }}
                    </td>
                    <td>{{ blog.description }}</td>
                    <td>
                      <img
                        :src="`http://localhost:8000/storage/${blog.picture}`"
                        alt="Blog Picture"
                        width="100"
                      />
                    </td>
                   
                    <td>
                      <button @click="editBooking(blog.id)" class="btn btn-primary">Edit</button>
                      <button @click="deleteBooking(blog.id)" class="btn btn-danger">
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
    const blogs = ref([])
    const router = useRouter()

    const fetchblogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/listofblogs`)
        blogs.value = response.data
      } catch (error) {
        console.error(error)
      }
    }

    const deleteBooking = async (blogId) => {
      try {
        const response = await axios.delete(`${API_URL}/blogs/${blogId}`)
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
          fetchblogs()
        }
      } catch (error) {
        toast.error('An error occurred while deleting the blog', {
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

    const editBooking = (blogId) => {
      router.push({ name: 'EditBlog', params: { id: blogId } })
    }

    onMounted(() => {
      fetchblogs()
    })

    return {
      blogs,
      deleteBooking,
      editBooking
    }
  }
}
</script>
