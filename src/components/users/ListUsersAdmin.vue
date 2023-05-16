<template>
    <Header :username="userHeader"/>
    <Menu :title="'List Users'" />
    <div class="flex justify-center mt-8">
        <div class="border-4 border-black2 rounded-xl w-900">
            <div class="grid grid-cols-3 text-center rounded-t-lg bg-blue-500 h-16 content-center">
                <div v-for="title in titles" class="font-lg font-bold text-white2"> {{ title.name }} </div>
            </div>
            <div class="bg-white2 rounded-b-lg">
                <div v-for="user in users" :key="user.id"
                    class="grid grid-cols-3 w-full text-center h-16 content-center">
                    <div class="font-lg text-darkBlue"> {{ user.firstName }} {{ user.lastName }} </div>
                    <div class="font-lg text-darkBlue"> {{ user.role.name }} </div>
                    <div v-if="!(user.role === 'Admin' && userLogged === 'TeamLeader')"
                        class="flex-justify-center space-x-2">
                        <Button :text="'Edit'"
                            class="text-blue-600 hover:text-white2 before:bg-blue-600 after:bg-blue-600 py-0.5 px-5"
                            @click="toggleEditPopup(user)" />
                        <Button :text="'Delete'"
                            class="text-red-600 hover:text-white2 before:bg-red-600 after:bg-red-600 py-0.5 px-3.5"
                            @click="toggleDeletePopup(user)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <DeleteUser v-if="deleteUser" :userToDelete="userToDelete" @userDeleted="deleteThisUser"
        @cancelUser="toggleDeletePopup" />
    <EditUser v-if="editUser" :userToEdit="userToEdit" @userEdited="editThisUser" @cancelEditUser="toggleEditPopup" />
</template>

<script>
import Button from '../widgets/Button.vue';
import Menu from '../public/MenuAdmin.vue';
import { mapState } from 'pinia';
import { userStore } from '../../stores/userStore';
import { userLogin } from '../../stores/userLogin';
import DeleteUser from '../Popups/DeleteUser.vue';
import EditUser from '../Popups/EditUser.vue';
import { useToast } from "vue-toastification";
import Header from '../public/Header.vue';
import http from '../../services/http'

export default {
    setup() {
        const userStoreT = userStore()
        return { userStoreT }
    },
    components: {
        Header,
        Menu,
        Button,
        DeleteUser,
        EditUser
    },
    data() {
        return {
            userLogged: userLogin().role,
            userHeader: userLogin().fullName,
            users: [],
            deleteUser: false,
            editUser: false,
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
            },
            titles: [
                { name: 'Name' },
                { name: 'Role' },
                { name: 'Actions' }
            ],
        };
    },
    mounted(){
        http.get('/users')
      .then(response => {
        this.users = response.data;
        console.log(this.users)
      })
      .catch(error => {
        console.error(error);
      });
    },
    computed: {
        ...mapState(userStore, ['getUsers']),
        // userLogged() {
        //     return userStore().user.role;
        // },
        // userHeader(){
        //     return userStore().user.fullName
        // },
    },
    methods: {
        toggleEditPopup(user) {
            this.editUser = !this.editUser;
            this.userToEdit = user;
        },
        toggleDeletePopup(user) {
            this.deleteUser = !this.deleteUser;
            this.userToDelete = user;
        },
        editThisUser(userToEdit) {
            const userToUpdate = this.getUsers[this.getUsers.findIndex(userFind => userFind.id == userToEdit.id)]
            const admins = this.getUsers.filter(user => user.role === 'Admin')
            const teamLeaders = this.getUsers.filter(user => user.role === 'TeamLeader')

            if (userToUpdate.role != userToEdit.role) {
                if (userToUpdate.role === 'Admin') {
                    if (admins.length > 1) {
                        this.editUser = !this.editUser;
                        this.userStoreT.update(userToEdit);
                        this.toast.success('User Updated Successfully!', this.toastCSS);
                    } 
                    else {
                        this.toast.error('Need to have at least one Admin in the App!', this.toastCSS);
                    }
                } if (userToUpdate.role === 'TeamLeader') {
                    if (teamLeaders.length > 1) {
                        this.editUser = !this.editUser;
                        this.userStoreT.update(userToEdit);
                        this.toast.success('User Updated Successfully!', this.toastCSS);
                    } else {
                        this.toast.error('Need to have at least one TeamLeader in the App!', this.toastCSS);
                    }
                } else if (userToUpdate.role === 'Member'){
                    this.editUser = !this.editUser;
                    this.userStoreT.update(userToEdit);
                    this.toast.success('User Updated Successfully!', this.toastCSS);
                }
            } else {
                this.editUser = !this.editUser;
                this.userStoreT.update(userToEdit);
                this.toast.success('User Updated Successfully!', this.toastCSS);
            }
        },
        deleteThisUser(userToDelete) {
            this.deleteUser = !this.deleteUser;
            this.userStoreT.delete(userToDelete)
        }
    }
}
</script>