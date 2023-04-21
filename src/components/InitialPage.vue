<template>
  <h1 class="text-lightBlue text-center text-5xl mt-28 font-bold">
    Hello Guys!
  </h1>
  <span class="flex text-lightBlue justify-center text-xl mt-6">
    Choose one of the Buttons to go to that Page!
  </span>
  <Menu/>
</template>

<script>
import Menu from './Menu.vue';

export default {
  components: {
    Menu
  },
}
</script>