<template>
    <h1 class="text-black2 text-center text-5xl mt-28 font-bold">
        Login
    </h1>
    <form @submit.prevent="login">
        <div class="flex justify-center h-48 mt-8">
            <div class="grid grid-cols-1 p-2 w-500 rounded-lg">
                <div class="h-72 w-500 rounded-outside p-1.5 shadow-box bg-card">
                    <div class="flex justify-center">
                        <div class="grid content-center gap-2">
                            <label class="h-7 w-96 p-1 text-lg text-white2"> Username </label>
                            <input class="h-7 w-96 p-1 m-2" type="text" placeholder="Anthony Shrimp" v-model="name">
                            <label class="h-7 w-96 p-1 text-lg text-white2"> Password </label>
                            <input class="h-7 w-96 p-1 m-2" type="text" placeholder="******">
                        </div>
                    </div>
                    <div class="flex justify-center mt-4">
                        <Button :text="'Login'"
                            class="text-white2 hover:text-black2 before:bg-white2 after:bg-white2 py-3 px-6" />
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import Button from './widgets/Button.vue';
import { mapState } from 'pinia';
import { userStore } from '../stores/userStore'
import { useToast } from "vue-toastification";

export default {
    components: {
        Button
    },
    data() {
        return {
            name: null,
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
            }
        }
    },
    computed: {
        ...mapState(userStore, ['getUsers']),
    },
    methods: {
        login() {
            const userLogin = this.getUsers[this.getUsers.findIndex(userFind => userFind.fullName == this.name)]
            userStore().login(userLogin)

            if (userLogin) {
                if (userStore().login(userLogin) == true) {
                    this.$router.push({ name: "Dashboard" })
                } else {
                    this.toast.error("Login Error, try again later", this.toastCSS)
                }
            } else {
                this.toast.error("User not found", this.toastCSS)
            }
        },
    }
}
</script>