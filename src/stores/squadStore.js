import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const squadStore = defineStore('squadStore', {
    state: () => {
        return {
            squads: useStorage('squads', []),
            squadEdit: useStorage('squadEdit', []),
            count: useStorage('count', 0)
        }
    },
    getters: {
        getSquads: (state) => state.squads,
        getCount: (state) => state.count
    },
    actions: {
        add(squad) {
            try {
                squad.id = uuidv4();
                this.squads.push(squad);
                this.count++
            } catch (error) {
                throw error
            }
        },
        update(squad) {
            try {
                this.squads[this.squads.findIndex(squadFind => squadFind.id == squad.id)] = squad
                this.squadEdit = squad;
            } catch (error) {
                throw error
            }
        },
        delete(squad) {
            try {
                const squadToDelete = this.squads.map(squad => squad.id).indexOf(squad)
                this.squads.splice( squadToDelete, 1 )
                if( this.count > 0 ) {
                    this.count--
                }
            } catch (error) {
                throw error
            }
        },
        cleanEdit() {
            this.squadEdit=[]
        }
    }
})