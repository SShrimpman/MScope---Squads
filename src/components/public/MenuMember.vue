<template>
    <div class="grid grid-cols-3 mt-28">
        <div class="col-start-2">
            <h1 class="text-black2 text-center text-5xl font-bold">
                {{ title }}
            </h1>
        </div>
        <div class="text-end mr-16">
            <Button :text="'Logout'" class="text-red-500 hover:text-white2 before:bg-red-500 after:bg-red-500 py-2 px-8"
            @click="logout"/>
        </div>
    </div>
    <div class="flex justify-center mt-8 gap-5">
        <Button :text="'List Users'" class="text-black2 hover:text-white2 before:bg-black2 after:bg-black2 py-6 px-6" @click="listUsers" />
        <Button :text="'List Squads'" class="text-black2 hover:text-white2 before:bg-black2 after:bg-black2 py-6 px-6" @click="listSquads" />
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
        logout(){
            this.$router.push({ name: "Login" });
        },
        listUsers() {
            this.$router.push({ name: "ListUsersMember" });
        },
        listSquads() {
            this.$router.push({ name: "ListSquadsMember" });
        },
    }
}
</script>