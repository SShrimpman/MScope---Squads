<template>
    <h1 class="text-lightBlue text-center text-5xl mt-28 font-bold">
        Create User
    </h1>
    <Menu/>
    <form @submit.prevent="newUser($event)">
        <div class="flex justify-center h-48 mt-8">
            <div class="grid grid-cols-1 p-2 w-500 bg-lightBlue rounded-lg">
                <div class="flex justify-center">
                    <div class="grid content-center">
                        <input class="h-7 w-96 p-1 m-2" type="text" placeholder="Name" v-model="addUser.fullName">
                        <input class="h-7 w-96 p-1 m-2" type="text" placeholder="Role" v-model="addUser.role">
                        <input class="h-7 w-96 p-1 m-2" type="text" placeholder="Photo" v-model="addUser.photo">
                    </div>
                </div>
                <div class="flex justify-center items-end gap-2">
                    <Button :text="'Save'" class="text-blue-600 before:bg-blue-600 after:bg-blue-600 py-0.5 px-3.5"/>
                    <Button :text="'Delete'" class="text-red-600 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5" @click="cancel"/>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
import user from '../models/user'
import { userStore } from '../stores/userStore'
import Menu from './Menu.vue'
import Button from './widgets/Button.vue'

export default {
    components: {
    Button,
    Menu
},
    setup() {
        const userStoreT = userStore()
        return { userStoreT }
    },
    data() {
        return {
            addUser: new user(),
        };
    },
    computed: {
        getContacts() {
            return this.userStoreT.getUsers;
        }
    },
    methods: {
        newUser(e) {
            if (this.addUser.id) {
                this.userStoreT.update(this.addUser)
                this.$router.push({ name: "ListUsers" });
            }
            else {
                this.userStoreT.add(this.addUser)
                this.$router.push({ name: "ListUsers" });
            }
        },
        cancel() {
            this.$router.push({ name: "ListUsers" });
        }
    },
}
</script>