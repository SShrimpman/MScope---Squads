import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const userStore = defineStore('userStore', {
    state: () => {
        return {
            users: useStorage('users', []),
        }
    },
    getters: {
        getUsers: (state) => state.users,
    },
    actions: {
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
                this.users[this.users.findIndex(userFind => userFind.id == user.id)] = user
            } catch (error) {
                throw error
            }
        },
        delete(user) {
            try {
                const userToDelete = this.users.map(user => user.id).indexOf(user)
                this.users.splice( userToDelete, 1 )
            } catch (error) {
                throw error
            }
        },
    }
})