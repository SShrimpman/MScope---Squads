<template>
    <div class="fixed flex justify-center h-full w-full top-0 left-0 items-center bg-transparentBg z-10">
        <div class="flex justify-center">
            <div class="grid w-500 rounded-xl bg-blue-500 content-center">
                <div class="grid grid-cols-4 text-3xl font-bold text-white2 p-3">
                    <div class="flex justify-center">
                        <img src="../../assets/save-01.svg" class="h-9">
                    </div>
                    <div class="flex justify-start col-span-3">Edit {{ userToEdit.fullName }}</div>
                </div>
                <div class="bg-white2 rounded-b-xl">
                    <form @submit.prevent="update">
                        <div class="flex justify-center h-58 mt-4">
                            <div class="grid grid-cols-1 p-2 gap-6 w-500 bg-lightBlue rounded-lg">
                                <div class="grid grid-cols-3">
                                    <div class="grid gap-3">
                                        <label class="flex justify-center h-7 p-1 text-lg"> Name </label>
                                        <label class="flex justify-center h-7 p-1 text-lg"> Role </label>
                                    </div>
                                    <div class="grid gap-5">
                                        <input class="h-7 p-1 border-2 border-black2 rounded-lg" type="text" v-model="userToEdit.fullName">
                                        <select class="h-7 border-2 border-black2 rounded-lg" v-model="userToEdit.role">
                                            <option>TeamLeader</option>
                                            <option>Member</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="flex justify-center items-end gap-2 mb-2">
                                    <Button :text="'Save'"
                                        class="text-blue-600 hover:text-white2 before:bg-blue-600 after:bg-blue-600 py-0.5 px-3.5" />
                                    <Button :text="'Cancel'"
                                        class="text-red-600 hover:text-white2 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5"
                                        @click="cancel" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../widgets/Button.vue';

export default {
    props: {
        userToEdit: {
            type: Object,
            default: null
        }
    },
    components: {
        Button
    },
    methods: {
        update() {
            this.$emit('userEdited', this.userToEdit)
        },
        cancel() {
            this.$emit('cancelEditUser')
        }
    }
}
</script>