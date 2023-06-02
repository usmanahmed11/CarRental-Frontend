<template>
  <div class="wrapper">
    <TopNavigationComponent />
    <SidebarComponent />

    <div class="content-wrapper">
      <div class="d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Add New Blog</h3>
            </div>

            <form class="form-label-left" @submit="handleSubmit" autocomplete="off">
              <div class="card-body">
                <div class="form-group">
                  <label for="blogTitle">Blog Title:</label>
                  <input
                    type="text"
                    id="blogTitle"
                    v-model="blogTitle"
                    :class="{ 'is-invalid': blogTitleError }"
                    class="form-control"
                    placeholder="Blog Title"
                  />
                  <div v-if="blogTitleError" class="invalid-feedback d-block font color">
                    {{ blogTitleError }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="blogCategory">Blog Category:</label>
                  <select id="blogCategory" v-model="blogCategory" class="form-control">
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
                    v-model="blogDescription"
                    :class="{ 'is-invalid': blogDescriptionError }"
                    class="form-control"
                    placeholder="Blog Description"
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
    const blogTitle = ref('')
    const blogCategory = ref('Travel blog')
    const blogDescription = ref('')
    const picture = ref(null)

    const blogTitleError = ref(null)
    const blogCategoryError = ref(null)
    const blogDescriptionError = ref(null)
    const pictureError = ref(null)

    const handleFileChange = (event) => {
      picture.value = event.target.files[0]
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      blogTitleError.value = null
      blogCategoryError.value = null
      blogDescriptionError.value = null
      pictureError.value = null

      if (!blogTitle.value) {
        blogTitleError.value = 'Blog Title is required'
      }
      if (!blogCategory.value) {
        blogCategoryError.value = 'Blog Category is required'
      }
      if (!blogDescription.value) {
        blogDescriptionError.value = 'Blog Description is required'
      }

      if (!picture.value) {
        pictureError.value = 'Picture Value is required'
      }
      if (!blogTitle.value || !blogCategory.value || !blogDescription.value || !picture.value) {
        return
      }

      let formData = new FormData()
      formData.append('blogTitle', blogTitle.value)
      formData.append('blogCategory', blogCategory.value)
      formData.append('blogDescription', blogDescription.value)
      formData.append('picture', picture.value, picture.value.name)
      try {
        const response = await axios.post(`${API_URL}/blogs`, formData)
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
          
          blogTitle.value = ''
          blogCategory.value = ''
          blogDescription.value = 0
          picture.value = null
        }
      } catch (error) {
        toast.error('An error occurred while adding the blog', {
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
      blogTitle,
      blogCategory,
      blogDescription,
      picture,
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
.color {
  color: red;
}
.font {
  font-size: 1rem !important;
}
</style>
