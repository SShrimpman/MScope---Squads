import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useToast } from 'vue-toastification'

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
                { id: uuidv4(), fullName: 'Anthony Shrimp', role: 'Member' }
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
                const userToUpdate = this.users[this.users.findIndex(userFind => userFind.id == user.id)]
                const admins = this.users.filter(user => user.role === 'Admin')

                if (userToUpdate.role != user.role) {
                    if (userToUpdate.role === 'Admin') {
                        if (admins.length > 1) {
                            this.users[this.users.findIndex(userFind => userFind.id == user.id)] = user
                            toast.success('User Updated Successfully!', toastCSS);
                        } else {
                            toast.error('Need to have at least one admin in the App!', toastCSS);
                        }
                    } else {
                        this.users[this.users.findIndex(userFind => userFind.id == user.id)] = user
                        toast.success('User Updated Successfully!', toastCSS);
                    }
                } else {
                    this.users[this.users.findIndex(userFind => userFind.id == user.id)] = user
                    toast.success('User Updated Successfully!', toastCSS);
                }
            } catch (error) {
                throw error
            }
        },
        delete(user) {
            try {
                const userToDelete = this.users.map(user => user.id).indexOf(user)
                const admins = this.users.filter(user => user.role === 'Admin')

                if (admins.length <= 1 && this.users[userToDelete].role === 'Admin') {
                    toast.error('Need to have at least one admin in the App!', toastCSS);
                } else {
                    this.users.splice(userToDelete, 1);
                    toast.success('User Deleted Successfully!', toastCSS);
                }
            } catch (error) {
                throw error
            }
        },
    }
})