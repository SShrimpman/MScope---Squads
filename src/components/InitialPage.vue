<template>
  <h1 class="text-green text-center text-5xl mt-36">
    Hello Guys!
  </h1>
  <span class="flex text-green justify-center text-xl mt-10">
    Choose one the Buttons to go to that Page!
  </span>
  <div class="flex justify-center mt-16 space-x-16">
    <Button :text="'List Users'" @click="listUsers"/>
    <Button :text="'List Squads'" @click="listSquads"/>
    <Button :text="'Create User'" @click="createUser"/>
    <Button :text="'Create Squad'" @click="createSquad"/>
  </div>
</template>

<script>
import Button from './widgets/Button.vue';

  export default {
    components: {
      Button
    },
    methods: {
      listUsers(){
        this.$router.push({ name: "ListUsers" });
      },
      listSquads(){
        this.$router.push({ name: "ListSquads" });
      },
      createUser(){
        this.$router.push({ name: "CreateUser" });
      },
      createSquad(){
        this.$router.push({ name: "CreateSquad" });
      }
    }
  }
</script>