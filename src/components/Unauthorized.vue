<template>
    <h1 class="text-black2 text-center text-7xl mt-28 font-bold">
        You are not authorized to access this page
    </h1>
    <div class="flex justify-center mt-8 gap-5">
        <Button :text="'To Login'" class="text-black2 hover:text-white2 before:bg-black2 after:bg-black2 py-6 px-6"
            @click="toLogin" />
    </div>
</template>

<script>
import Button from './widgets/Button.vue';

export default {
    components: {
        Button
    },
    methods: {
        toLogin() {
            this.$router.push({ name: "Login" });
        }
    }
}
</script>