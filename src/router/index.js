import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue"
import ListUsersAdmin from "../components/users/ListUsersAdmin.vue"
import ListUsersMember from "../components/users/ListUsersMember.vue"
import ListSquadsAdmin from "../components/squads/ListSquadsAdmin.vue"
import ListSquadsMember from "../components/squads/ListSquadsMember.vue"
import CreateSquad from "../components/squads/CreateSquad.vue"
import CreateUser from "../components/users/CreateUser.vue"
import Login from "../components/Login.vue"
import Unauthorized from "../components/Unauthorized.vue"
import { userStore } from "../stores/userStore";

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/unauthorized', name: 'Unauthorized', component: Unauthorized },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/userslist', name: 'ListUsersAdmin', component: ListUsersAdmin, meta: { requiresAuth: true, role: 'TeamLeader' || 'Admin' } },
    { path: '/userslist', name: 'ListUsersMember', component: ListUsersMember, meta: { requiresAuth: true, role: 'Member' } },
    { path: '/squadslist', name: 'ListSquadsAdmin', component: ListSquadsAdmin, meta: { requiresAuth: true, role: 'TeamLeader' || 'Admin' } },
    { path: '/squadslist', name: 'ListSquadsMember', component: ListSquadsMember, meta: { requiresAuth: true, role: 'Member' } },
    { path: '/squadcreate', name: 'CreateSquad', component: CreateSquad, meta: { requiresAuth: true, role: 'TeamLeader' || 'Admin' } },
    { path: '/usercreate', name: 'CreateUser', component: CreateUser, meta: { requiresAuth: true, role: 'TeamLeader' || 'Admin' } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = userStore().isUserLoggedIn

    if (to.meta.requiresAuth) {
      if (isUserLoggedIn) {
        next();
      } else {
        next("/unauthorized")
      }
    } else {
      next();
    }
  })
  

export default router