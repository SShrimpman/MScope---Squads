import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const userStore = defineStore('userStore', {
    state: () => {
        return {
            users: useStorage('users', []),
            userEdit: useStorage('userEdit', []),
            count: useStorage('count', 0)
        }
    },
    getters: {
        getUsers: (state) => state.users,
        getCount: (state) => state.count
    },
    actions: {
        add(user) {
            try {
                user.id = uuidv4();
                this.users.push(user);
                this.count++
            } catch (error) {
                throw error
            }
        },
        update(user) {
            try {
                this.users[this.users.findIndex(userFind => userFind.id == user.id)] = user
                this.userEdit = user;
            } catch (error) {
                throw error
            }
        },
        delete(user) {
            try {
                const userToDelete = this.users.map(user => user.id).indexOf(user)
                this.users.splice( userToDelete, 1 )
                if( this.count > 0 ) {
                    this.count--
                }
            } catch (error) {
                throw error
            }
        },
        cleanEdit() {
            this.userEdit=[]
        }
    }
})