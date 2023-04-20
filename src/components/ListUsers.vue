<template>
    <h1 class="text-lightBlue text-center text-5xl mt-28 font-bold">
        List Users
    </h1>
    <div class="flex justify-center mt-8 gap-5">
        <Button :text="'List Users'" @click="listUsers" />
        <Button :text="'List Squads'" @click="listSquads" />
        <Button :text="'Create User'" @click="createUser" />
        <Button :text="'Create Squad'" @click="createSquad" />
    </div>
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
    <div class="flex justify-center">
        <div class="grid grid-cols-3 w-900 text-center rounded-b-xl bg-lightBlue h-16 content-center">
            <div class="font-lg">
                John Stream
            </div>
            <div class="font-lg">
                TeamLeader
            </div>
            <div class="flex-justify-center space-x-2">
                <button class="relative overflow-hidden font-bold z-1 border-2 border-green-500 text-green-500 bg-transparent rounded w-16">Edit</button>
                <button class="bg-red-500 rounded w-16">Delete</button>
                <ButtonList :text="'Edit'"/>
            </div>
        </div>
    </div>
</template>

<script>
import Button from './widgets/Button.vue';
import ButtonList from './widgets/ButtonList.vue';

export default {
    components: {
        Button,
        ButtonList
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