<template>
    <div class="flex justify-center mt-8 gap-5">
        <MenuButton :text="'List Users'" @click="listUsers" />
        <MenuButton :text="'List Squads'" @click="listSquads" />
        <MenuButton :text="'Create User'" @click="createUser" />
        <MenuButton :text="'Create Squad'" @click="createSquad" />
    </div>
</template>

<script>
import MenuButton from './widgets/MenuButton.vue';

export default {
    components: {
        MenuButton
    },
    methods: {
        listUsers() {
            this.$router.push({ name: "ListUsers" });
        },
        listSquads() {
            this.$router.push({ name: "ListSquads" });
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