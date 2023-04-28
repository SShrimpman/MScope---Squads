<template>
    <Menu :title="'Create User'" :user="userLogged"/>
    <form>
        <div class="flex justify-center h-48 mt-8">
            <div class="grid grid-cols-1 p-2 w-500 bg-lightBlue rounded-lg">
                <div class="flex justify-center">
                    <div class="grid content-center">
                        <label class="h-7 w-96 p-1 text-lg"> Name </label>
                        <input class="h-7 w-96 p-1 m-2" type="text" placeholder="Anthony Shrimp" v-model="addUser.fullName">
                        <label class="h-7 w-96 p-1 text-lg"> Role </label>
                        <select class="h-7 w-96 p-1 m-2" v-model="addUser.role">
                            <option> TeamLeader </option>
                            <option> Member </option>
                        </select>
                    </div>
                </div>
                <div class="flex justify-center items-end gap-2 mt-5">
                    <Button :text="'Save'" class="text-blue-600 hover:text-white2 before:bg-blue-600 after:bg-blue-600 py-0.5 px-3.5" @click="newUser"/>
                    <Button :text="'Cancel'" class="text-red-600 hover:text-white2 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5" @click="cancel"/>
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
    setup() {
        const userStoreT = userStore()
        return { userStoreT }
    },
    components: {
        Button,
        Menu
    },
    data() {
        return {
            addUser: new user(),
        };
    },
    computed: {
        userLogged() {
            return userStore().user.role;
        }
    },
    methods: {
        newUser() {
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