import { createRouter, createWebHistory } from 'vue-router';

import EditProfile from '../components/profile/edit-profile.vue';
import UserProfile from '../components/profile/user-profile.vue';

const routes = [
  { path: '/profile', component: UserProfile },
  { path: '/edit-profile', component: EditProfile },
  { path: '/', redirect: '/profile' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
