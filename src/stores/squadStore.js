import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useToast } from 'vue-toastification'

const toast = useToast()
const toastCSS = {
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
                toast.success('Squad Created Successfully!', toastCSS);
            } catch (error) {
                throw error
            }
        },
        update(squad) {
            try {
                this.squads[this.squads.findIndex(squadFind => squadFind.id == squad.id)] = squad
                toast.success('Squad Updated Successfully!', toastCSS);
            } catch (error) {
                throw error
            }
        },
        delete(squad, loggedUser) {
            try {
                const squadToDeleteIndex = this.squads.map( squad => squad.id ).indexOf( squad.id )
                const squadToDelete = this.squads[ squadToDeleteIndex ]

                const admins = squadToDelete.members.filter( member => member.role === 'Admin' )

                if ( loggedUser == 'TeamLeader' ) {
                    if ( admins.length > 0 ) {
                        toast.error( "Can't Delete a Squad with a Admin in it!", toastCSS )
                    } else {
                        this.squads.splice( squadToDeleteIndex, 1 )
                        toast.success('Squad Deleted Successfully!', toastCSS);
                    }
                } else if( loggedUser == 'Admin' ){
                    this.squads.splice( squadToDeleteIndex, 1 )
                    toast.success('Squad Deleted Successfully!', toastCSS);
                }
            } catch (error) {
                throw error
            }
        },
    }
})