<template>
  <Menu :title="'Hello Guys!'"/>
  <span class="flex text-black2 justify-center text-xl mt-10">
    Choose one of the Buttons to go to that Page!
  </span>
</template>

<script>
import Menu from './Menu.vue';

export default {
  components: {
    Menu
  },
}
</script>