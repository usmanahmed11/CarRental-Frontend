import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
import DashboardView from '../views/Dashboard/DashboardView.vue'
import RegisterView from '../views/Login/RegisterView.vue'
import ResetPasswordView from '../views/Login/ResetPasswordView.vue'
import UpdatePasswordView from '../views/Login/UpdatePasswordView.vue'
import ActivateAccountView from '../views/Login/ActivateAccountView.vue'
import { isAuthenticated } from '../auth'
import ProfileUpdate from '../views/Profile/ProfileUpdate.vue'
import ChangePassword from '../views/Profile/ChangePassword.vue'
import AddCars from '../views/Cars/AddCars.vue'
import ListOfCars from '../views/Cars/ListOfCars.vue'
import EditCars from '../views/Cars/EditCars.vue'
import CarBooking from '../views/Cars/CarBooking.vue'
import ListOfCarBookings from '../views/Cars/ListOfCarBookings.vue'
import EditBookings from '../views/Cars/EditBookings.vue'
import BlogForm from '../views/Blogs/BlogForm.vue'
import ListOfBlogs from '../views/Blogs/ListOfBlogs.vue'
import EditBlog from '../views/Blogs/EditBlog.vue'
import ServiceForm from '../views/Services/ServiceForm.vue'
import ListOfServices from '../views/Services/ListOfServices.vue'
import EditService from '../views/Services/EditService.vue'
import ClientView from '../views/ClientView/ClientView.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ClientView',
      component: ClientView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView
    },
    {
      path: '/update-password',
      name: 'update-password',
      component: UpdatePasswordView,
      props: true
    },

    {
      path: '/activate-account',
      name: 'activate-account',
      component: ActivateAccountView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/update-profile',
      name: 'update-profile',
      component: ProfileUpdate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePassword,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-cars',
      name: 'add-cars',
      component: AddCars,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-of-cars',
      name: 'list-of-cars',
      component: ListOfCars,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-car/:id',
      name: 'EditCar',
      component: EditCars,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/car-booking',
      name: 'CarBooking',
      component: CarBooking,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-of-car-bookings',
      name: 'list-of-car-bookings',
      component: ListOfCarBookings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-booking/:id',
      name: 'EditBooking',
      component: EditBookings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-blogs',
      name: 'add-blogs',
      component: BlogForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-of-blogs',
      name: 'list-of-blogs',
      component: ListOfBlogs,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-blog/:id',
      name: 'EditBlog',
      component: EditBlog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-service',
      name: 'add-service',
      component: ServiceForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-of-services',
      name: 'list-of-services',
      component: ListOfServices,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-service/:id',
      name: 'EditService',
      component: EditService,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // If the route requires authentication and the user is not authenticated, redirect to the login page
    next('/login')
  } else {
    // Allow access to the route
    next()
  }
})

export default router
