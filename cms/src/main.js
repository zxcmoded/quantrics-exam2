import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/main.css'

import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from 'moment'
import VeeValidate from 'vee-validate';

window.toastr = require('toastr')

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueAxios, axios)

Vue.use(VueToastr2)

Vue.use(VeeValidate,{
  fieldsBagName:'fieldBags'
})

Vue.filter('decimalFormat', function (value) {
  if (value) {
    return parseFloat(value).toFixed(2)
  }
  return '';
})

Vue.filter('dateFormat', function (value) {
  if (value) {
    return moment(value).format('MM/DD/YYYY')
  }
  return '';
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
