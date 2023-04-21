<template>
    <button id="buttonList"> {{ text }} </button>
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
#buttonList {
 background-color: transparent;
 border-radius: .3em;
 position: relative;
 overflow: hidden;
 cursor: pointer;
 transition: .5s;
 font-weight: 700;
 font-size: 15px;
 border: 1px solid;
 font-family: inherit;
 z-index: 1;
}

#buttonList::before, #buttonList::after {
 content: '';
 display: block;
 width: 40px;
 height: 40px;
 transform: translate(-50%, -50%);
 position: absolute;
 border-radius: 50%;
 z-index: -1;
 transition: 1s ease;
}

#buttonList::before {
 top: -1em;
 left: -1em;
}

#buttonList::after {
 left: calc(100% + 1em);
 top: calc(100% + 1em);
}

#buttonList:hover::before, #buttonList:hover::after {
 height: 410px;
 width: 410px;
}

#buttonList:hover {
 color: #9fd1ff;
}

#buttonList:active {
 filter: brightness(.8);
}
</style>