<template>
    <h1 class="text-lightBlue text-center text-5xl mt-28 font-bold">
        List Squads
    </h1>
    <Menu/>
    <div class="grid grid-cols-3 mt-8">
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
