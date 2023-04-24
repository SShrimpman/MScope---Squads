<template>
    <Menu :title="'List Users'" />
    <div class="flex justify-center mt-8">
        <div class="border-4 border-black2 rounded-xl w-900">
            <div class="grid grid-cols-3 text-center rounded-t-lg bg-blue-500 h-16 content-center">
                <div v-for="title in titles" class="font-lg font-bold text-black2"> {{ title.name }} </div>
            </div>
            <div class="bg-white2 rounded-b-lg">
                <div v-for="user in getUsers" :key="user.id" class="grid grid-cols-3 w-full text-center h-16 content-center">
                    <div class="font-lg text-darkBlue"> {{ user.fullName }} </div>
                    <div class="font-lg text-darkBlue"> {{ user.role }} </div>
                    <div class="flex-justify-center space-x-2">
                        <Button :text="'Edit'" class="text-blue-600 hover:text-black2 before:bg-blue-600 after:bg-blue-600 py-0.5 px-5" />
                        <Button :text="'Delete'" class="text-red-600 hover:text-black2 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5"
                            @click="toggleDelete(user)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ConfirmationDelete v-if="deleteUser" :userToDelete="userToDelete" @userDeleted="deleteThisUser"  @cancelUser="toggleDelete"/>
</template>

<script>
import Button from './widgets/Button.vue';
import Menu from './Menu.vue';
import { mapState } from 'pinia';
import { userStore } from '../stores/userStore';
import ConfirmationDelete from './Popups/ConfirmationDelete.vue';

export default {
    components: {
        Menu,
        Button,
        ConfirmationDelete
    },
    setup() {
        const userStoreT = userStore()
        return { userStoreT }
    },
    data() {
        return {
            count: 0,
            option: null,
            deleteUser: false,
            titles: [
                {
                    name: 'Name'
                },
                {
                    name: 'Role'
                },
                {
                    name: 'Actions'
                }
            ]
        };
    },
    computed: {
        ...mapState(userStore, ['getUsers', 'getCount']),
    },
    methods: {
        toggleDelete(user) {
            this.deleteUser = !this.deleteUser;
            this.userToDelete = user;
        },
        deleteThisUser(userToDelete){
            this.deleteUser = !this.deleteUser;
            this.userStoreT.delete(userToDelete.id)
        }
    }
}
</script>