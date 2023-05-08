<template>
    <h1 class="text-black2 text-center text-5xl font-bold mt-28">
        {{ title }}
    </h1>
    <div class="flex justify-center mt-8 gap-5">
        <Button :text="'List Users'" class="text-black2 hover:text-white2 before:bg-black2 after:bg-black2 py-6 px-6"
            @click="listUsers" />
        <Button :text="'List Squads'" class="text-black2 hover:text-white2 before:bg-black2 after:bg-black2 py-6 px-6"
            @click="listSquads" />
        <Button :text="'Create User'" class="text-black2 hover:text-white2 before:bg-black2 after:bg-black2 py-6 px-6"
            @click="createUser" />
        <Button :text="'Create Squad'" class="text-black2 hover:text-white2 before:bg-black2 after:bg-black2 py-6 px-5"
            @click="createSquad" />
    </div>
</template>

<script>
import Button from '../widgets/Button.vue';

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    components: {
        Button
    },
    methods: {
        logout() {
            this.$router.push({ name: "Login" });
        },
        listUsers() {
            this.$router.push({ name: "ListUsersAdmin" });
        },
        listSquads() {
            this.$router.push({ name: "ListSquadsAdmin" });
        },
        createUser() {
            this.$router.push({ name: "CreateUser" });
        },
        createSquad() {
            this.$router.push({ name: "CreateSquad" });
        }
    }
}
</script>