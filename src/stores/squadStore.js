import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const squadStore = defineStore('squadStore', {
    state: () => {
        return {
            squads: useStorage('squads', []),
        }
    },
    getters: {
        getSquads: (state) => state.squads,
    },
    actions: {
        add(squad) {
            try {
                squad.id = uuidv4();
                this.squads.push(squad);
            } catch (error) {
                throw error
            }
        },
        update(squad) {
            try {
                this.squads[this.squads.findIndex(squadFind => squadFind.id == squad.id)] = squad
            } catch (error) {
                throw error
            }
        },
        delete(squad) {
            try {
                const squadToDelete = this.squads.map(squad => squad.id).indexOf(squad)
                this.squads.splice( squadToDelete, 1 )
            } catch (error) {
                throw error
            }
        },
    }
})