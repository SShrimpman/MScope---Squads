<template>
    <Menu :title="'List Squads'"/>
    <div class="flex justify-center mt-8">
        <input type="text" class="bg-white2 text-lg border-2 border-black2 h-12 w-900 pl-2 rounded-lg"
         placeholder="Search for a Squad Here" v-model="search">
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3 text-white2 mt-8 mb-8 sm:gap-10">
        <div v-for="squad in filteredSquads" :key="squad.id" class="flex justify-center">
            <Card :squad="squad"/>
        </div>
    </div>
</template>

<script>
import Menu from '../public/MenuMember.vue';
import Card from '../widgets/CardMember.vue';
import { mapState } from 'pinia';
import { squadStore } from '../../stores/squadStore';
import { userStore } from '../../stores/userStore';

export default {
    setup() {
        const squadStoreT = squadStore()
        return { squadStoreT }
    },
    components: {
        Card,
        Menu,
    },
    data(){
        return {
            search: '',
            deleteSquad: false,
            editSquad: false,
        }
    },
    computed: {
        ...mapState(squadStore, ['getSquads']),
        userLogged() {
            return userStore().user.role;
        },
        filteredSquads(){
            return this.getSquads.filter(squad => squad.id.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
}
</script>
