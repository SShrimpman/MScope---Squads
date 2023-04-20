<template>
  <h1 class="text-lightBlue text-center text-5xl mt-28 font-bold">
    Hello Guys!
  </h1>
  <span class="flex text-lightBlue justify-center text-xl mt-6">
    Choose one of the Buttons to go to that Page!
  </span>
  <div class="flex justify-center mt-8 gap-5">
    <Button :text="'List Users'" @click="listUsers" />
    <Button :text="'List Squads'" @click="listSquads" />
    <Button :text="'Create User'" @click="createUser" />
    <Button :text="'Create Squad'" @click="createSquad" />
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