<template>
    <div class="fixed flex justify-center h-full w-full top-0 left-0 items-center bg-transparentBg z-10">
        <div class="flex justify-center">
            <div class="grid w-500 rounded-xl bg-backgroundHeader content-center">
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
                                        <input class="h-7 w-96 p-1 m-2 border-2 border-black2 rounded-lg" v-bind:disabled="userLogged === 'TeamLeader'" type="text" v-model="form.squadName">
                                        <label class="h-7 w-96 p-1 text-lg"> Reference </label>
                                        <input class="h-7 w-96 p-1 m-2 border-2 border-black2 rounded-lg" v-bind:disabled="userLogged === 'TeamLeader'" type="text" v-model="form.reference">
                                        <label class="h-7 w-96 p-1">
                                            <span class="text-lg"> Members </span>
                                            <span class="text-sm"> (Hold Ctrl for multiple select) </span> 
                                        </label>
                                        <select multiple class="block p-1 m-2 border-2 border-black2 rounded-lg" v-model="form.members">
                                            <option v-for="user in getUsers" :key="user.id" :class="{'hidden disabled': hideAdmin(user.role)}"
                                             :value="{ fullName: user.fullName, role: user.role }">
                                                {{ user.fullName }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="flex justify-center mt-3 items-end gap-2">
                                    <Button :text="'Save'"
                                        class="text-blue-600 hover:text-white2 before:bg-blue-600 after:bg-blue-600 py-0.5 px-3.5"
                                         />
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
import { userLogin } from '../../stores/userLogin';
import { userStore } from '../../stores/userStore';
import Button from '../widgets/Button.vue';
import { mapState } from 'pinia';

export default {
    // setup(){
    //     const userStoreT = userStore();
    //     return { userStoreT}
    // },
    props: {
        squadToEdit: {
            type: Object,
            default: null
        }
    },
    components: {
        Button
    },
    data(){
        return {
            userLogged: userLogin().role,
            form : {
                id : null,
                squadName : '',
                reference : '',
                members : []
            }
        }
    },
    mounted(){
        this.form.id = this.squadToEdit.id;
        this.form.squadName = this.squadToEdit.squadName;
        this.form.reference = this.squadToEdit.reference;
        this.form.members = this.squadToEdit.members;
    },
    computed: {
        ...mapState(userStore, ['getUsers']),
        // userLogged() {
        //     return userStore().user.role;
        // },
    },
    methods: {
        hideAdmin(userRole){
            if (userRole === 'Admin' && this.userLogged === 'TeamLeader'){
                return true
            } else {
                return false
            }
        },
        update() {
            this.$emit('squadEdited', this.form)
        },
        cancel(event) {
            event.preventDefault();
            this.$emit('cancelEditSquad')
        }
    }
}
</script>