import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import { squadStore } from './squadStore'

const toast = useToast()
const toastCSS = {
    position: "top-right",
    timeout: 2000,
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

export const userStore = defineStore('userStore', {
    state: () => {
        return {
            users: useStorage('users', [
                // Pre-created user data
                { id: uuidv4(), fullName: 'Francis Kings', role: 'Admin' },
                { id: uuidv4(), fullName: 'John Stream', role: 'TeamLeader' },
                { id: uuidv4(), fullName: 'Anthony Shrimp', role: 'Member' },
                { id: uuidv4(), fullName: 'Nathaniel Days', role: 'Member' },
                { id: uuidv4(), fullName: 'Richard Scallop', role: 'Member' },
                { id: uuidv4(), fullName: 'John Fun', role: 'Member' }
            ]),
            user: null,
            isUserLoggedIn: null
        }
    },
    getters: {
        getUsers: (state) => state.users,
    },
    actions: {
        login(user) {
            if (this.user = user) {
                return this.isUserLoggedIn = true
            } else {
                return this.isUserLoggedIn = false
            }
        },
        add(user) {
            try {
                user.id = uuidv4();
                this.users.push(user);
                toast.success('User Created Successfully!', toastCSS);
            } catch (error) {
                throw error
            }
        },
        update(user) {
            try {
                this.users[this.users.findIndex(userFind => userFind.id == user.id)] = user
            } catch (error) {
                throw error
            }
        },
        delete(user) {
            try {
                const userToDelete = this.users.map(user => user.id).indexOf(user.id)
                const admins = this.users.filter(user => user.role === 'Admin')
                const squads = squadStore().getSquads
                const membersArray = []
                let squadCount = 0

                for (let i = 0; i < squads.length; i++) {
                    const squad = squads[i];

                    for (let j = 0; j < squad.members.length; j++) {
                        membersArray.push(squad.members[j])
                    }
                }

                for (let i = 0; i < membersArray.length; i++) {
                    if (membersArray[i].fullName === user.fullName) {
                        squadCount++
                    }
                }

                if (squadCount > 0) {
                    toast.error('User is a member of a squad and cannot be deleted!', toastCSS);
                } else {
                    if (admins.length <= 1 && this.users[userToDelete].role === 'Admin') {
                        toast.error('Need to have at least one admin in the App!', toastCSS);
                    } else {
                        this.users.splice(userToDelete, 1);
                        toast.success('User Deleted Successfully!', toastCSS);
                    }
                }
            } catch (error) {
                throw error
            }
        },
    }
})