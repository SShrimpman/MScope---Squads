<template>
    <Header :username="userHeader"/>
    <Menu :title="'List Squads'"/>
    <div class="flex justify-center mt-8">
        <input type="text" class="bg-white2 text-lg border-2 border-black2 h-12 w-900 pl-2 rounded-lg"
         placeholder="Search for a Squad Here" v-model="search">
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3 text-white2 mt-8 mb-8 sm:gap-10">
        <div v-for="squad in filteredSquads" :key="squad.id" class="flex justify-center">
            <Card :squad="squad" @toggleEdit="toggleEditPopup" @toggleDelete="toggleDeletePopup(squad)" :user="userLogged"/>
        </div>
    </div>
    <DeleteSquad v-if="deleteSquad" :squadToDelete="squadToDelete" @squadDeleted="deleteThisSquad"  @cancelSquad="toggleDeletePopup"/>
    <EditSquad v-if="editSquad" :squadToEdit="squadToEdit" @squadEdited="editThisSquad" @cancelEditSquad="toggleEditPopup"/>
</template>

<script>
import Menu from '../public/MenuAdmin.vue';
import Card from '../widgets/CardAdmin.vue';
import { mapState } from 'pinia';
import { squadStore } from '../../stores/squadStore';
import DeleteSquad from '../Popups/DeleteSquad.vue';
import EditSquad from '../Popups/EditSquad.vue';
import { userStore } from '../../stores/userStore';
import { userLogin } from '../../stores/userLogin';
import { useToast } from "vue-toastification";
import Header from '../public/Header.vue';

export default {
    setup() {
        const squadStoreT = squadStore()
        return { squadStoreT }
    },
    components: {
        Header,
        Card,
        Menu,
        DeleteSquad,
        EditSquad
    },
    data(){
        return {
            userLogged: userLogin().role,
            userHeader: userLogin().fullName,
            search: '',
            deleteSquad: false,
            editSquad: false,
            toast : useToast(),
            toastCSS : {
                position: "top-right",
                timeout: 2500,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            }
        }
    },
    computed: {
        ...mapState(squadStore, ['getSquads']),
        // userLogged() {
        //     return userStore().user.role;
        // },
        // userHeader(){
        //     return userStore().user.fullName
        // },
        filteredSquads(){
            return this.getSquads.filter(squad => squad.reference.toLowerCase().includes(this.search.toLowerCase()))
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
            const hasAdmin = squadToEdit.members.some(member => member.role === 'Admin');
            const hasTeamLeader = squadToEdit.members.some(member => member.role === 'TeamLeader');
            
            if( hasAdmin || hasTeamLeader ) {
                this.editSquad = !this.editSquad;
                this.squadStoreT.update(squadToEdit)
                this.toast.success('Squad Updated Successfully!', this.toastCSS);
            } else {
                this.toast.error( "Squad needs at least one Admin or TeamLeader!", this.toastCSS )
            }
        },
        deleteThisSquad(squadToDelete , loggedUser){
            this.deleteSquad = !this.deleteSquad;
            this.squadStoreT.delete(squadToDelete, loggedUser)
        }
    }
}
</script>
