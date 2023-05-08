<template>
    <div class="grid grid-cols-5 bg-backgroundHeader border-b-2 border-highlight sticky top-0">
        <div class="col-span-4">
            <img class="w-header p-1 ml-1" src="../../assets/logo.svg">
        </div>
        <div class="grid grid-cols-2">
            <div class="flex justify-end items-center text-white2">
                <div class="grid bg-white2 text-black2 rounded-full h-9 w-9 mr-2 text-sm">
                    <div class="flex justify-center items-center">
                        JS
                    </div>
                    <div class="absolute mt-6 ml-6 text-tiny text-green-500 border-1 border-white2 bg-green-500 rounded-full h-3 w-3">a</div>
                </div>
                {{ username }} 
            </div>
            <div class="flex justify-center items-center">
                <Button :text="'Logout'"
                    class="text-red-500 hover:text-backgroundHeader before:bg-red-500 after:bg-red-500 py-1 px-8" @click="logout"/>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../widgets/Button.vue';

export default {
    props: {
        username: {
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
    }
}
</script>