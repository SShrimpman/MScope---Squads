<template>
    <button class="button"> {{ text }} </button>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true,
            },
        }
    }
</script>

<style>
.button {
 padding: 0.8em 1.7em;
 background-color: transparent;
 border-radius: .3em;
 position: relative;
 overflow: hidden;
 cursor: pointer;
 transition: .5s;
 font-weight: 700;
 font-size: 17px;
 border: 1px solid;
 font-family: inherit;
 color: #282828;
 z-index: 1;
}

.button::before, .button::after {
 content: '';
 display: block;
 width: 50px;
 height: 50px;
 transform: translate(-50%, -50%);
 position: absolute;
 border-radius: 50%;
 z-index: -1;
 background-color: #282828;
 transition: 1s ease;
}

.button::before {
 top: -1em;
 left: -1em;
}

.button::after {
 left: calc(100% + 1em);
 top: calc(100% + 1em);
}

.button:hover::before, .button:hover::after {
 height: 410px;
 width: 410px;
}

.button:hover {
 color: #ECECEC;
}

.button:active {
 filter: brightness(.8);
}
</style>