<template>
    <Menu :title="'List Users'"/>
    <div class="flex justify-center mt-8">
        <div class="border-4 border-black2 rounded-xl w-900">
            <div class="grid grid-cols-2 text-center rounded-t-lg bg-blue-500 h-16 content-center">
                <div v-for="title in titles" class="font-lg font-bold text-white2"> {{ title.name }} </div>
            </div>
            <div class="bg-white2 rounded-b-lg">
                <div v-for="user in getUsers" :key="user.id" 
                    class="grid grid-cols-2 w-full text-center h-16 content-center">
                    <div class="font-lg text-darkBlue"> {{ user.fullName }} </div>
                    <div class="font-lg text-darkBlue"> {{ user.role }} </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../widgets/Button.vue';
import Menu from '../public/MenuMember.vue';
import { mapState } from 'pinia';
import { userStore } from '../../stores/userStore';

export default {
    setup() {
        const userStoreT = userStore()
        return { userStoreT }
    },
    components: {
        Menu,
        Button,
    },
    data() {
        return {
            titles: [
                { name: 'Name' },
                { name: 'Role' }
            ],
        };
    },
    computed: {
        ...mapState(userStore, ['getUsers']),
        userLogged() {
            return userStore().user.role;
        }
    },
}
</script>