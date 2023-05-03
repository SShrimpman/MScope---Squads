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
        delete(squad, loggedUser) {
            try {
                const squadToDeleteIndex = this.squads.map( squad => squad.id ).indexOf( squad.id )
                const squadToDelete = this.squads[ squadToDeleteIndex ]

                const admins = squadToDelete.members.filter( member => member.role === 'Admin' )
                const adminCount = admins.length

                if ( loggedUser == 'TeamLeader' ) {
                    if ( adminCount > 0 ) {
                        window.alert( 'Delete Error : Cant Delete Squad with a Admin in it!' )
                    } else {
                        this.squads.splice( squadToDeleteIndex, 1 )
                    }
                } else if( loggedUser == 'Admin' ){
                    this.squads.splice( squadToDeleteIndex, 1 )
                }
            } catch (error) {
                throw error
            }
        },
    }
})