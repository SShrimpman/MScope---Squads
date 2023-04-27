<template>
    <Menu :title="'List Squads'" :user="userLogged"/>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3 text-white2 mt-8 mb-8 sm:gap-10">
        <div v-for="squad in getSquads" :key="squad.id" class="flex justify-center">
            <Card :squad="squad" @toggleEdit="toggleEditPopup" @toggleDelete="toggleDeletePopup(squad)" :user="userLogged"/>
        </div>
    </div>
    <DeleteSquad v-if="deleteSquad" :squadToDelete="squadToDelete" @squadDeleted="deleteThisSquad"  @cancelSquad="toggleDeletePopup"/>
    <EditSquad v-if="editSquad" :squadToEdit="squadToEdit" @squadEdited="editThisSquad" @cancelEditSquad="toggleEditPopup"/>
</template>

<script>
import Menu from './Menu.vue';
import Card from './widgets/Card.vue';
import { mapState } from 'pinia';
import { squadStore } from '../stores/squadStore';
import DeleteSquad from './Popups/DeleteSquad.vue';
import EditSquad from './Popups/EditSquad.vue';
import { userStore } from '../stores/userStore';

export default {
    components: {
        Card,
        Menu,
        DeleteSquad,
        EditSquad
    },
    setup() {
        const squadStoreT = squadStore()
        return { squadStoreT }
    },
    computed: {
        ...mapState(squadStore, ['getSquads']),
        userLogged() {
            return userStore().user.role;
        }
    },
    data(){
        return {
            deleteSquad: false,
            editSquad: false,
        }
    },
    methods: {
        toggleEditPopup(squad) {
            this.editSquad = !this.editSquad;
            this.squadToEdit = squad;
        },
        toggleDeletePopup(squad) {
            this.deleteSquad = !this.deleteSquad;
            this.squadToDelete = squad;
        },
        editThisSquad(squadToEdit){
            this.editSquad = !this.editSquad;
            this.squadStoreT.update(squadToEdit)
        },
        deleteThisSquad(squadToDelete){
            this.deleteSquad = !this.deleteSquad;
            this.squadStoreT.delete(squadToDelete.id)
        }
    }
}
</script>
