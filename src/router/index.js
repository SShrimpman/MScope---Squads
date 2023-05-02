import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue"
import ListUsers from "../components/users/ListUsers.vue"
import ListSquads from "../components/squads/ListSquads.vue"
import CreateSquad from "../components/squads/CreateSquad.vue"
import CreateUser from "../components/users/CreateUser.vue"
import Login from "../components/Login.vue"

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/userslist', name: 'ListUsers', component: ListUsers },
    { path: '/squadslist', name: 'ListSquads', component: ListSquads },
    { path: '/squadcreate', name: 'CreateSquad', component: CreateSquad },
    { path: '/usercreate', name: 'CreateUser', component: CreateUser }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router