<template>
    <div class="h-250 w-500 rounded-outside p-1.5 shadow-box bg-card">
        <div class="grid grid-rows-3 rounded-inside h-100 w-100 bg-white2 text-black2">
            <div class="font-bold ml-3 mt-1 text-l">
                {{ squad.reference }}
            </div>
            <div class="text-center font-bold text-2xl">
                {{ squad.squadName }}
            </div>
            <div class="grid grid-cols-3 font-bold ml-3">
                <div class="grid content-center col-span-2">
                    <select class="h-7 w-40 border-2 border-black2 rounded-lg">
                        <option disabled selected hidden> See Members </option>
                        <option disabled v-for="user in squad.users">{{ user.firstName }} {{ user.lastName }}</option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-2 m-4 mr-4">
                    <Button :text="'Edit'"
                        class="text-blue-600 hover:text-white2 before:bg-blue-600 after:bg-blue-600 py-3.5"
                        @click="toggleEdit(squad)" />
                    <Button :text="'Delete'"
                        class="text-red-600 hover:text-white2 before:bg-red-600 after:bg-red-600 py-3.5"
                        @click="toggleDelete(squad)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';

export default {
    props: {
        squad: {
            type: Object,
            required: true
        },
        user: {
            type: String,
            required: true,
        }
    },
    components: {
        Button
    },
    data() {
        return {
            dropdown: false
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdown = !this.dropdown
        },
        toggleEdit(squad) {
            this.$emit('toggleEdit', squad)
        },
        toggleDelete(squad) {
            this.$emit('toggleDelete', squad)
        }
    }
}
</script>
