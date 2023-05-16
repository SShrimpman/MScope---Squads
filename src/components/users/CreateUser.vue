<template>
    <Header :username="userHeader"/>
    <Menu :title="'Create User'"/>
    <form @submit.prevent="newUser">
        <div class="flex justify-center h-48 mt-8">
            <div class="grid grid-cols-1 p-2 w-500 bg-lightBlue rounded-lg">
                <div class="flex justify-center">
                    <div class="grid content-center">
                        <label class="h-7 w-96 p-1 text-lg"> First Name </label>
                        <input class="h-8 w-96 p-1 m-2 border-2 border-black2 rounded-lg" type="text" placeholder="Anthony" v-model="addUser.firstName">
                        <label class="h-7 w-96 p-1 text-lg"> Last Name </label>
                        <input class="h-8 w-96 p-1 m-2 border-2 border-black2 rounded-lg" type="text" placeholder="Shrimp" v-model="addUser.lastName">
                        <label class="h-7 w-96 p-1 text-lg"> Username </label>
                        <input class="h-8 w-96 p-1 m-2 border-2 border-black2 rounded-lg" type="text" placeholder="AS" v-model="addUser.username">
                        <label class="h-7 w-96 p-1 text-lg"> Password </label>
                        <input class="h-8 w-96 p-1 m-2 border-2 border-black2 rounded-lg" type="password" placeholder="********" v-model="addUser.password">
                        <label class="h-7 w-96 p-1 text-lg"> Role </label>
                        <select class="h-8 w-96 p-1 m-2 border-2 border-black2 rounded-lg" v-model="addUser.role_id">
                            <option disabled selected hidden> Select Role </option>
                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                            <!-- <option v-if="userLogged == 'Admin'" > Admin </option>
                            <option> TeamLeader </option>
                            <option> Member </option> -->
                        </select>
                    </div>
                </div>
                <div class="flex justify-center items-end gap-2 mt-5">
                    <Button :text="'Create'" class="text-blue-600 hover:text-white2 before:bg-blue-600 after:bg-blue-600 py-0.5 px-3.5"/>
                    <!-- <Button :text="'Cancel'" class="text-red-600 hover:text-white2 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5" @click="cancel"/> -->
                </div>
            </div>
        </div>
    </form>
</template>

<script>
// import user from '../../models/user'
import Header from '../public/Header.vue'
import Menu from '../public/MenuAdmin.vue'
import Button from '../widgets/Button.vue'
import { userStore } from '../../stores/userStore'
import { userLogin } from '../../stores/userLogin'
import { useToast } from "vue-toastification";
import http from '../../services/http'

export default {
    // setup() {
    //     const userStoreT = userStore()
    //     return { userStoreT }
    // },
    components: {
        Header,
        Button,
        Menu
    },
    data() {
        return {
            userHeader: userLogin().fullName,
            userLogged: userLogin().role,
            roles: [],
            toast : useToast(),
            toastCSS : {
                position: "top-right",
                timeout: 2500,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            },
            // addUser: new user(),
            addUser: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                role_id: ''
            }
        };
    },
    created() {
        this.addUser.role_id = 'Select Role'
    },
    mounted(){
        http.get('/roles')
      .then(response => {
        this.roles = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    // computed: {
    //     userLogged() {
    //         return userStore().user.role;
    //     },
    //     userHeader(){
    //         return userStore().user.fullName
    //     },
    // },
    methods: {
        newUser() {
            // this.userStoreT.add(this.addUser)
            http.post('/users', this.addUser)
                .then(response => {
                    console.log('User created successfully.');
                    console.log(response)
                    this.$router.push({ name: "ListUsersAdmin" });
                    this.toast.success('User Created Successfully!', this.toastCSS);
                })
                .catch(error => {
                    console.error('Failed to create user:', error);
                    this.toast.error("User Couldn't be Created", this.toastCSS);
                });
        },
        // cancel(event) {
        //     event.preventDefault();
        //     this.$router.push({ name: "ListUsersAdmin" });
        // }
    },
}
</script>