<template>
    <Menu :title="'List Squads'"/>
    <div class="grid grid-cols-3 mt-8 text-white2 mb-8">
        <div v-for="squad in getSquads" :key="squad.id" class="flex justify-center">
            <Card :reference="squad.reference" :squadTitle="squad.squadName" :membersNames="squad.members"/>
        </div>
    </div>
</template>

<script>
import Menu from './Menu.vue';
import Card from './widgets/Card.vue';
import { mapState } from 'pinia';
import { squadStore } from '../stores/squadStore';

export default {
    components: {
        Card,
        Menu
    },
    setup() {
        const squadStoreT = squadStore()
        return { squadStoreT }
    },
    computed: {
        ...mapState(squadStore, ['getSquads', 'getCount']),
    },
}
</script>
