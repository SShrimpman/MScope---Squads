<template>
  <Header :username="userHeader"/>
  <MenuAdmin v-if="user == 'Admin' || user == 'TeamLeader'" :title="username"/>
  <MenuMember v-if="user == 'Member'" :title="username"/>
  <span class="flex text-black2 justify-center text-xl mt-10">
    Choose one of the Buttons to go to that Page!
  </span>
</template>

<script>
import Header from './public/Header.vue';
import MenuAdmin from './public/MenuAdmin.vue';
import MenuMember from './public/MenuMember.vue';
import { userStore } from '../stores/userStore';

export default {
  components: {
    Header,
    MenuAdmin,
    MenuMember
  },
  computed: {
    user(){
      return userStore().user.role;
    },
    userHeader(){
      return userStore().user.fullName
    },
    username(){
      return 'Hello ' + userStore().user.fullName + '!'
    }
  },
}
</script>