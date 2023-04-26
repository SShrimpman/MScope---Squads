<template>
    <div class="fixed flex justify-center h-full w-full top-0 left-0 items-center bg-transparentBg z-10">
        <div class="flex justify-center">
            <div class="grid w-500 rounded-xl bg-blue-500 content-center">
                <div class="grid grid-cols-3 text-3xl font-bold text-white2 p-3">
                    <div class="flex justify-center">
                        <img src="../../assets/save-01.svg" class="h-9">
                    </div>
                    <div class="flex justify-start col-span-2">Edit {{ squadToEdit.squadName }}</div>
                </div>
                <div class="bg-white2 rounded-b-xl">
                    <form @submit.prevent="update">
                        <div class="flex justify-center h-96 mt-8">
                            <div class="grid grid-cols-1 p-2 w-500 bg-lightBlue rounded-lg">
                                <div class="flex justify-center">
                                    <div class="grid content-center">
                                        <label class="h-7 w-96 p-1 text-lg"> Squad Name </label>
                                        <input class="h-7 w-96 p-1 m-2 border-2 border-black2 rounded-lg" type="text" v-model="squadToEdit.squadName">
                                        <label class="h-7 w-96 p-1 text-lg"> Reference </label>
                                        <input class="h-7 w-96 p-1 m-2 border-2 border-black2 rounded-lg" type="text" v-model="squadToEdit.reference">
                                        <label class="h-7 w-96 p-1 text-lg"> Members </label>
                                        <select multiple class="block p-1 m-2 border-2 border-black2 rounded-lg" v-model="squadToEdit.members">
                                            <option v-for="user in getUsers" :key="user.id">{{ user.fullName }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="flex justify-center mt-3 items-end gap-2">
                                    <Button :text="'Save'"
                                        class="text-blue-600 before:bg-blue-600 after:bg-blue-600 py-0.5 px-3.5"
                                         />
                                    <Button :text="'Cancel'"
                                        class="text-red-600 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5"
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
import { userStore } from '../../stores/userStore';
import { mapState } from 'pinia';
import Button from '../widgets/Button.vue';

export default {
    setup(){
        const userStoreT = userStore();
        return { userStoreT}
    },
    props: {
        squadToEdit: {
            type: Object,
            default: null
        }
    },
    components: {
        Button
    },
    computed: {
        ...mapState(userStore, ['getUsers']),
    },
    methods: {
        update() {
            this.$emit('squadEdited', this.squadToEdit)
        },
        cancel() {
            this.$emit('cancelEditSquad')
        }
    }
}
</script>