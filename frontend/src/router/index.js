import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Equipments from '../views/Equipments.vue';
import MyLoans from '../views/MyLoans.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/equipamentos', component: Equipments },
  { path: '/meus-empréstimos', component: MyLoans }
];

export default createRouter({ history: createWebHistory(), routes });