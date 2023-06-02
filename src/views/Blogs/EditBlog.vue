<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent />

    <div class="content-wrapper">
      <div class="d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Edit Blog</h3>
            </div>

            <form class="form-label-left" @submit="handleSubmit" autocomplete="off">
              <div class="card-body">
                <div class="form-group">
                  <label for="blogTitle">Blog Title:</label>
                  <input
                    type="text"
                    id="blogTitle"
                    v-model="blog.blogTitle"
                    :class="{ 'is-invalid': blogTitleError }"
                    class="form-control"
                  />
                  <div v-if="blogTitleError" class="invalid-feedback d-block font color">
                    {{ blogTitleError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="blogCategory">Blog Category:</label>
                  <select id="blogCategory" v-model="blog.blogCategory" class="form-control">
                    <option value="Food Blog">Food blog</option>
                    <option value="Travel blog">Travel blog</option>
                    <option value=" Health and fitness blog">Health and fitness blog</option>
                    <option value="Lifestyle blog">Lifestyle blog</option>
                    <option value="Fashion and beauty blog">Fashion and beauty blog</option>
                    <option value="Photography blog">Photography blog</option>
                    <option value="Personal blog">Personal blog</option>
                  </select>
                  <div v-if="blogCategoryError" class="invalid-feedback d-block font color">
                    {{ blogCategoryError }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="Blog Description">Blog Description:</label>
                  <input
                    type="text"
                    id="Blog Description"
                    v-model="blog.blogDescription"
                    :class="{ 'is-invalid': blogDescriptionError }"
                    class="form-control"
                  />
                  <div v-if="blogDescriptionError" class="invalid-feedback d-block font color">
                    {{ blogDescriptionError }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="picture">Blog Picture</label>
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
    const blogId = ref(null)
    const picture = ref(null)

    const blog = ref({
      blogTitle: '',
      blogDescription: '',
      blogCategory: ''
    })
    const blogTitleError = ref(null)
    const blogCategoryError = ref(null)
    const blogDescriptionError = ref(null)
    const pictureError = ref(null)

    const router = useRouter()
    const fetchBlogs = async () => {
      try {
        blogId.value = router.currentRoute.value.params.id
        const response = await axios.get(`${API_URL}/blogs/${blogId.value}/show`)
        const blogData = response.data
        blog.value = {
          blogTitle: blogData.title,
          blogCategory: blogData.category,
          blogDescription: blogData.description
        }

      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      fetchBlogs()
    })

    const handleFileChange = (event) => {
      picture.value = event.target.files[0]
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      blogTitleError.value = null
      blogCategoryError.value = null
      blogDescriptionError.value = null
      pictureError.value = null

      if (!blog.value.blogTitle) {
        blogTitleError.value = 'Blog Title is required'
      }
      if (!blog.value.blogCategory) {
        blogCategoryError.value = 'Blog Category is required'
      }
      if (!blog.value.blogDescription) {
        blogDescriptionError.value = 'Blog Description is required'
      }

      if (!blog.value.blogTitle || !blog.value.blogCategory || !blog.value.blogDescription) {
        return
      }

      let formData = new FormData()
      formData.append('blogTitle', blog.value.blogTitle)
      formData.append('blogCategory', blog.value.blogCategory)
      formData.append('blogDescription', blog.value.blogDescription)
      formData.append('picture', picture.value)
      try {
        const response = await axios.post(`${API_URL}/blogs/${blogId.value}`, formData)
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
        toast.error('An error occurred while Updating the Blog', {
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
      blog,
      blogTitleError,
      blogCategoryError,
      blogDescriptionError,
      pictureError,
      handleSubmit,
      handleFileChange
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
