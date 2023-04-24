<template>
    <Menu :title="'Create Squad'" />
    <form @submit.prevent="newSquad($event)">
        <div class="flex justify-center h-48 mt-8">
            <div class="grid grid-cols-1 p-2 w-500 bg-lightBlue rounded-lg">
                <div class="flex justify-center">
                    <div class="grid content-center">
                        <label class="h-7 w-96 p-1 text-lg"> Squad Name </label>
                        <input class="h-7 w-96 p-1 m-2" type="text" placeholder="IT Squad" v-model="addSquad.squadName">
                        <label class="h-7 w-96 p-1 text-lg"> Reference </label>
                        <input class="h-7 w-96 p-1 m-2" type="text" placeholder="122333" v-model="addSquad.reference">
                        <label class="h-7 w-96 p-1 text-lg"> Members </label>
                        <input class="h-7 w-96 p-1 m-2" type="text" placeholder="Members" v-model="addSquad.members">
                        <select class="h-7 w-96 p-1 m-2">
                            <option selected>Choose a member</option>
                            <option v-for="user in getUsers" :key="user.id">{{ user.fullName }}</option>
                        </select>
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
import squad from '../models/squad'
import { userStore } from '../stores/userStore'
import { squadStore } from '../stores/squadStore'
import { mapState } from 'pinia';
import Menu from './Menu.vue'
import Button from './widgets/Button.vue'

export default {
    components: {
        Button,
        Menu
    },
    setup() {
        const userStoreT = userStore();
        const squadStoreT = squadStore();
        return { userStoreT, squadStoreT }
    },
    data() {
        return {
            addSquad: new squad(),
        };
    },
    computed: {
        ...mapState(userStore, ['getUsers']),
    },
    methods: {
        newSquad(e) {
            if (this.addSquad.id) {
                this.squadStoreT.update(this.addSquad)
                this.$router.push({ name: "ListSquads" });
            }
            else {
                this.squadStoreT.add(this.addSquad)
                this.$router.push({ name: "ListSquads" });
            }
        },
        cancel() {
            this.$router.push({ name: "ListSquads" });
        }
    },
}
</script>