<template>
    <Menu :title="'Create Squad'"/>
    <form @submit.prevent="newSquad($event)">
        <div class="flex justify-center h-48 mt-8">
            <div class="grid grid-cols-1 p-2 w-500 bg-lightBlue rounded-lg">
                <div class="flex justify-center">
                    <div class="grid content-center">
                        <label class="h-7 w-96 p-1 text-lg"> Squad Name </label>
                        <input class="h-8 w-96 p-1 m-2 border-2 border-black2 rounded-lg" type="text" placeholder="IT Squad" v-model="addSquad.squadName">
                        <label class="h-7 w-96 p-1 text-lg"> Reference </label>
                        <input class="h-8 w-96 p-1 m-2 border-2 border-black2 rounded-lg" type="text" placeholder="122333" v-model="addSquad.reference">
                        <label class="h-7 w-96 p-1 text-lg"> Members </label>
                        <select multiple class="block p-1 m-2 border-2 border-black2 rounded-lg" v-model="addSquad.members">
                            <option v-for="user in getUsers" :key="user.id" :class="{'hidden disabled': hideAdmin(user.role)}"
                             :value="{ fullName: user.fullName, role: user.role }">
                                {{ user.fullName }}
                            </option>
                        </select>
                        <div v-if="error" class="flex justify-center text-red-500"> {{ errorText }} </div>
                    </div>
                </div>
                <div class="flex justify-center mt-3 items-end gap-2">
                    <Button :text="'Save'" class="text-blue-600 before:bg-blue-600 after:bg-blue-600 py-0.5 px-3.5" />
                    <Button :text="'Cancel'" class="text-red-600 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5"
                        @click="cancel" />
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import squad from '../../models/squad'
import { userStore } from '../../stores/userStore'
import { squadStore } from '../../stores/squadStore'
import { mapState } from 'pinia';
import Menu from '../public/MenuAdmin.vue'
import Button from '../widgets/Button.vue'

export default {
    setup() {
        const userStoreT = userStore();
        const squadStoreT = squadStore();
        return { userStoreT, squadStoreT }
    },
    components: {
        Button,
        Menu
    },
    data() {
        return {
            addSquad: new squad(),
            error: false,
            errorText : '',
        };
    },
    computed: {
        ...mapState(userStore, ['getUsers']),
        userLogged() {
            return userStore().user.role;
        },
    },
    methods: {
        hideAdmin(userRole){
            if (userRole === 'Admin' && this.userLogged === 'TeamLeader'){
                return true
            } else {
                return false
            }
        },
        newSquad(e) {
            const hasAdmin = this.addSquad.members.some(member => member.role === 'Admin');
            const hasTeamLeader = this.addSquad.members.some(member => member.role === 'TeamLeader');

            if( hasAdmin || hasTeamLeader ) {
                this.squadStoreT.add(this.addSquad)
                this.$router.push({ name: "ListSquadsAdmin" });
            } else {
                this.errorText = 'It needs to have at Least one Admin or Team Leader in the Squad!'
                this.error = !this.error
            }
        },
        cancel() {
            this.$router.push({ name: "ListSquadsAdmin" });
        }
    },
}
</script>