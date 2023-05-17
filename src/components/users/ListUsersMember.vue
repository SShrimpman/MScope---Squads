<template>
    <Header :username="userHeader"/>
    <Menu :title="'List Users'"/>
    <div class="flex justify-center mt-8">
        <div class="border-4 border-black2 rounded-xl w-900">
            <div class="grid grid-cols-2 text-center rounded-t-lg bg-backgroundHeader h-16 content-center">
                <div v-for="title in titles" class="font-lg font-bold text-white2"> {{ title.name }} </div>
            </div>
            <div class="bg-white2 rounded-b-lg">
                <div v-for="user in users" :key="user.id" 
                    class="grid grid-cols-2 w-full text-center h-16 content-center">
                    <div class="font-lg text-darkBlue"> {{ user.firstName }} {{ user.lastName }} </div>
                    <div class="font-lg text-darkBlue"> {{ user.role.name }} </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../widgets/Button.vue';
import Menu from '../public/MenuMember.vue';
// import { mapState } from 'pinia';
// import { userStore } from '../../stores/userStore';
import { userLogin } from '../../stores/userLogin';
import Header from '../public/Header.vue';
import http from '../../services/http'

export default {
    // setup() {
    //     const userStoreT = userStore()
    //     return { userStoreT }
    // },
    components: {
        Header,
        Menu,
        Button,
    },
    mounted(){
        http.get('/users')
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    },
    data() {
        return {
            userLogged: userLogin().role,
            userHeader: userLogin().fullName,
            titles: [
                { name: 'Name' },
                { name: 'Role' }
            ],
            users: []
        };
    },
    // computed: {
    //     ...mapState(userStore, ['getUsers']),
    //     userLogged() {
    //         return userStore().user.role;
    //     },
    //     userHeader(){
    //         return userStore().user.fullName
    //     },
    // },
}
</script>