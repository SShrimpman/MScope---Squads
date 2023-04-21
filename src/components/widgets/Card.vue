<template>
    <div class="h-250 w-500 rounded-outside p-1.5 shadow-box bg-card">
        <div class="grid grid-rows-3 rounded-inside h-100 w-100 bg-background text-lightBlue">
            <div class="font-bold ml-3 mt-1 text-l">
                Reference
            </div>
            <div class="text-center font-bold text-2xl">
                Squad Title
            </div>
            <div class="grid grid-cols-2 font-bold text-sm ml-3">
                <div>
                    Members
                </div>
                <div class="grid content-end m-2 ml-28">
                    <MenuButton :text="'Details'"/>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import MenuButton from './MenuButton.vue';

export default {
    components: {
        MenuButton
    }
}
</script>
