<template>
    <div class="h-250 w-500 rounded-outside p-1.5 shadow-box bg-card">
        <div class="grid grid-rows-3 rounded-inside h-100 w-100 bg-background">
            <div class="font-bold ml-3 mt-1 text-l">
                {{ reference }}
            </div>
            <div class="text-center font-bold text-2xl">
                {{ squadTitle }}
            </div>
            <div class="grid grid-cols-2 font-bold text-sm ml-3">
                <div>
                    <h1 class="mt-3"> Members: </h1>
                    <h2 class="mt-2 ml-2"> {{ membersNames }} </h2>
                </div>
                <div class="grid content-end m-2 ml-28">
                    <Button :text="'Details'" class="text-white2 hover:text-background before:bg-white after:bg-white py-3.5"/>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';

export default {
    props: {
        reference: {
            type: String,
            required: true
        },
        squadTitle: {
            type: String,
            required: true
        },
        membersNames: {
            type: String,
            required: true
        }
    },
    components: {
        Button
    }
}
</script>
