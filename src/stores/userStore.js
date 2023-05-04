import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

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
            isUserLoggedIn : null
        }
    },
    getters: {
        getUsers: (state) => state.users,
    },
    actions: {
        login(user){
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
            } catch (error) {
                throw error
            }
        },
        update(user) {
            try {
                const userToUpdate = this.users[this.users.findIndex(userFind => userFind.id == user.id)]
                const admins = this.users.filter(user => user.role === 'Admin')

                if (userToUpdate.role != user.role) {
                    if ( userToUpdate.role === 'Admin' ) {
                        if (admins.length > 1) {
                            this.users[this.users.findIndex(userFind => userFind.id == user.id)] = user
                        } else {
                            console.log('Need to have at least one admin in the App!')
                        }
                    } else {
                        this.users[this.users.findIndex(userFind => userFind.id == user.id)] = user
                    }
                } else {
                    this.users[this.users.findIndex(userFind => userFind.id == user.id)] = user
                }
            } catch (error) {
                throw error
            }
        },
        delete(user) {
            try {
                const userToDelete = this.users.map(user => user.id).indexOf(user)
                const admins = this.users.filter(user => user.role === 'Admin')

                admins.length > 0 ? this.users.splice( userToDelete, 1 ) : console.log('Need to have at least one admin in the App!')
            } catch (error) {
                throw error
            }
        },
    }
})