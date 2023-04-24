<template>
    <Menu :title="'List Squads'"/>
    <div class="grid grid-cols-3 mt-8 text-white2">
        <div class="flex justify-center mb-8">
            <Card />
        </div>
        <div class="flex justify-center">
            <Card />
        </div>
        <div class="flex justify-center">
            <Card />
        </div>
        <div class="flex justify-center">
            <Card />
        </div>
        <div class="flex justify-center">
            <Card />
        </div>
        <div class="flex justify-center">
            <Card />
        </div>
    </div>
</template>

<script>
import Menu from './Menu.vue';
import Card from './widgets/Card.vue';

export default {
    components: {
        Card,
        Menu
    },
}
</script>
