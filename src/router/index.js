import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Classify from '../views/Classify.vue';
import Shopping from '../views/Shopping.vue';
import Search from '../views/Search.vue';
import Index from '../views/Index.vue';
import My from '../views/My.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Order from '../views/Order.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'classify',
        name: 'classify',
        component: Classify,
      },
      {
        path: 'shopping',
        component: Shopping,
      },
      {
        path: 'index',
        component: Index,
      },
      {
        path: 'my',
        component: My,
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
  },
  {
    path: '*',
    redirect: '/home/index',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
