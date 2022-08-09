import Vue from 'vue'
import VueRouter from 'vue-router'
import Asset from '../views/asset/Asset.vue';
import Invoice from '../views/invoice/Invoice.vue';
import HelloWorld from '../views/home/HelloWorld.vue';

Vue.use(VueRouter)


const routes = [
  { path: '/', component: HelloWorld },
  { path: '/asset', component: Asset },
  { path: '/invoice', component: Invoice },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
