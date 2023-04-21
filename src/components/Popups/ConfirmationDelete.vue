<template>
    <div class="fixed flex justify-center h-full w-full top-0 left-0 items-center bg-transparentBg z-10">
        <div class="flex justify-center mt-8">
            <div class="grid w-500 rounded-xl bg-blue-500 content-center">
                <div class="grid grid-cols-3 text-3xl font-bold text-white2 p-3">
                    <div class="flex justify-end">
                        <img src="../../assets/help-circle.svg" class="h-9">
                    </div>
                    <div class="text-center"> Delete </div>
                </div>
                <div class="bg-white2 p-4 text-center">
                    Are you sure you want do delete {{ userToDelete.fullName }} ?
                </div>
                <div class="bg-white2 rounded-b-xl">
                    <div class="flex justify-center space-x-2 mb-6">
                        <Button :text="'Delete'" class="text-red-600 hover:text-black2 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5" @click="deleteUser(userToDelete)"/>
                        <Button :text="'Cancel'" class="text-blue-600 hover:text-black2 before:bg-blue-600 after:bg-blue-600 py-0.5 px-4" @click="cancel"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../widgets/Button.vue';

export default {
    props: {
        userToDelete: {
            type: Object,
            default: null
        }
    },
    components: {
        Button
    },
    methods: {
        deleteUser(userToDelete){
            this.$emit('userDeleted', userToDelete)
        },
        cancel(){
            this.$emit('cancelUser')
        }
    }
}
</script>