<template>
  <Menu :title="'Hello Guys!'" :user="user"/>
  <span class="flex text-black2 justify-center text-xl mt-10">
    Choose one of the Buttons to go to that Page!
  </span>
</template>

<script>
import Menu from './Menu.vue';
import { userStore } from '../stores/userStore';

export default {
  components: {
    Menu
  },
  computed: {
    user(){
      return userStore().user.role;
    }
  },
}
</script>