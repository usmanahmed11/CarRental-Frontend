<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link to="/dashboard" class="brand-link">
      <img
        src="/img/2.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">Car Rental</span>
    </router-link>

    <div class="sidebar">
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link  ">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-car"></i>
              <p>
               Our Cars
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/add-cars" class="nav-link ">
                  <i class="fas fa-angle-right nav-icon"></i>
                  <p>Add Car</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/list-of-cars" class="nav-link ">
                  <i class="fas fa-angle-right nav-icon"></i>
                  <p>List Of Cars</p>
                </router-link>
              </li>
            
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>
