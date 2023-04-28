import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue"
import ListUsers from "../components/ListUsers.vue"
import ListSquads from "../components/ListSquads.vue"
import CreateSquad from "../components/CreateSquad.vue"
import CreateUser from "../components/CreateUser.vue"
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