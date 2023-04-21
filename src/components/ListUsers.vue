<template>
    <h1 class="text-lightBlue text-center text-5xl mt-28 font-bold">
        List Users
    </h1>
    <Menu />
    <div class="flex justify-center mt-8">
        <div class="grid grid-cols-3 w-900 text-center rounded-t-xl bg-blue-500 h-16 content-center">
            <div class="font-lg font-bold">
                Name
            </div>
            <div class="font-lg font-bold">
                Role
            </div>
            <div class="font-lg font-bold">
                Actions
            </div>
        </div>
    </div>
    <div v-for="(user, index) in getUsers" :key="user.id" class="flex justify-center">
        <div :class="{ 'rounded-b-xl': isLastUser(index) }"
            class="grid grid-cols-3 w-900 text-center bg-lightBlue h-16 content-center">
            <div class="font-lg"> {{ user.fullName }} </div>
            <div class="font-lg"> {{ user.role }} </div>
            <div class="flex-justify-center space-x-2">
                <Button :text="'Edit'" class="text-blue-600 before:bg-blue-600 after:bg-blue-600 py-0.5 px-5" />
                <Button :text="'Delete'" class="text-red-600 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5" />
            </div>
        </div>
    </div>
</template>

<script>
import Button from './widgets/Button.vue';
import Menu from './Menu.vue';
import { mapState } from 'pinia';
import { userStore } from '../stores/userStore';

export default {
    components: {
        Menu,
        Button
    },
    setup() {
        const userStoreT = userStore()
        return { userStoreT }
    },
    data() {
        return {
            count: 0,
            option: null,
        };
    },
    computed: {
        ...mapState(userStore, ['getUsers', 'getCount']),
        isLastUser() {
            return (index) => index === this.getUsers.length - 1;
        }
    },
}
</script>