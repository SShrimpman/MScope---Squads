<template>
    <h1 class="text-lightBlue text-center text-5xl mt-28 font-bold">
        List Squads
    </h1>
    <div class="flex justify-center mt-8 gap-5">
        <Button :text="'List Users'" @click="listUsers" />
        <Button :text="'List Squads'" @click="listSquads" />
        <Button :text="'Create User'" @click="createUser" />
        <Button :text="'Create Squad'" @click="createSquad" />
    </div>
    <div class="grid grid-cols-3 mt-8">
        <div class="flex justify-center mb-8">
            <Card/>
        </div>
        <div class="flex justify-center">
            <Card/>
        </div>
        <div class="flex justify-center">
            <Card/>
        </div>
        <div class="flex justify-center">
            <Card/>
        </div>
        <div class="flex justify-center">
            <Card/>
        </div>
        <div class="flex justify-center">
            <Card/>
        </div>
    </div>
</template>

<script>
import Button from './widgets/Button.vue';
import Card from './widgets/Card.vue';

export default {
    components: {
        Button,
        Card
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
