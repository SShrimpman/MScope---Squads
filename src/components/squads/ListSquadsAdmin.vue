<template>
    <Header :username="userHeader"/>
    <Menu :title="'List Squads'"/>
    <div class="flex justify-center mt-8">
        <input type="text" class="bg-white2 text-lg border-2 border-black2 h-12 w-900 pl-2 rounded-lg"
         placeholder="Search for a Squad Here" v-model="search">
    </div>
    <!-- <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3 text-white2 mt-8 mb-8 sm:gap-10">
        <div v-for="squad in filteredSquads" :key="squad.id" class="flex justify-center">
            <Card :squad="squad" @toggleEdit="toggleEditPopup" @toggleDelete="toggleDeletePopup(squad)" :user="userLogged"/>
        </div>
    </div> -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3 text-white2 mt-8 mb-8 sm:gap-10">
      <div v-for="squad in filteredSquads" :key="squad.id" class="flex justify-center">
        <Card :squad="squad" :users="users" @toggleEdit="toggleEditPopup" @toggleDelete="toggleDeletePopup(squad)" :user="userLogged"/>
      </div>
    </div>
    <DeleteSquad v-if="deleteSquad" :squadToDelete="squadToDelete" @squadDeleted="deleteThisSquad"  @cancelSquad="toggleDeletePopup"/>
    <EditSquad v-if="editSquad" :squadToEdit="squadToEdit" @squadEdited="editThisSquad" @cancelEditSquad="toggleEditPopup"/>
</template>

<script>
import Menu from '../public/MenuAdmin.vue';
import Card from '../widgets/CardAdmin.vue';
// import { mapState } from 'pinia';
// import { squadStore } from '../../stores/squadStore';
import DeleteSquad from '../Popups/DeleteSquad.vue';
import EditSquad from '../Popups/EditSquad.vue';
// import { userStore } from '../../stores/userStore';
import { userLogin } from '../../stores/userLogin';
import { useToast } from "vue-toastification";
import Header from '../public/Header.vue';
import http from '../../services/http'

export default {
    // setup() {
    //     const squadStoreT = squadStore()
    //     return { squadStoreT }
    // },
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
            squads: [],
            users: [],
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
    mounted(){
        http.get('/squads')
            .then(response => {
                this.squads = response.data;
            })
            .catch(error => {
              console.error(error);
            });

        // Fetch the users data from the backend API
        http.get('/users')
            .then(response => {
            this.users = response.data;
            })
            .catch(error => {
            console.error(error);
            });
    },
    computed: {
        // ...mapState(squadStore, ['getSquads']),
        // userLogged() {
        //     return userStore().user.role;
        // },
        // userHeader(){
        //     return userStore().user.fullName
        // },
        filteredSquads(){
            return this.squads.filter(squad => squad.reference.toLowerCase().includes(this.search.toLowerCase()))
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
            // const hasAdmin = squadToEdit.members.some(member => member.role === 'Admin');
            // const hasTeamLeader = squadToEdit.members.some(member => member.role === 'TeamLeader');
            
            // if( hasAdmin || hasTeamLeader ) {
            //     this.squadStoreT.update(squadToEdit)
            //     this.toast.success('Squad Updated Successfully!', this.toastCSS);
            // } else {
            //     this.toast.error( "Squad needs at least one Admin or TeamLeader!", this.toastCSS )
            // }
            http.put(`/squads/${squadToEdit.id}`, squadToEdit)
                .then(response => {
                    this.editSquad = !this.editSquad;
                    // Finding the Squad on the Squads Array
                    const index = this.squads.findIndex(squad => squad.id === squadToEdit.id);
                    // Update the squad object in the array instead of replacing it completely
                    this.squads[index] = response.data.squad;
                    this.toast.success(response.data.message);
                })
                .catch(error => {
                    // Handle the error
                    this.toast.error(error.response.data.error);
                });
        },
        // deleteThisSquad(squadToDelete , loggedUser)
        deleteThisSquad(squadToDelete){
            // this.squadStoreT.delete(squadToDelete, loggedUser)
            http.delete(`/squads/${squadToDelete.id}`)
                .then(response => {
                    this.deleteSquad = !this.deleteSquad;
                    // Finding the Squad on the Squads Array
                    const index = this.squads.findIndex(squad => squad.id === squadToDelete.id);
                    // Remove the deleted squad from the users array
                    this.squads.splice(index, 1);
                    this.toast.success(response.data.message, this.toastCSS);
                })
                .catch(error => {
                    this.toast.error(error.response.data.message, this.toastCSS);
                });
        }
    }
}
</script>
