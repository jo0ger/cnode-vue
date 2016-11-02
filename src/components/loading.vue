<template>
<svg class="spinner" :class="{ show: show }" width="44px" height="44px" viewBox="0 0 44 44">
  <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
</svg>
</template>

<script>
export default {
    props: ["show"]
};
</script>

<style lang="sass">
$offset: 126;
$duration: 1.5s;
$color: #20a0ff;
.spinner {
    position: fixed;
    z-index: 999;
    right: 15px;
    top: 10px;
    opacity: 0;
    transition: opacity 0.15s ease;
    animation: rotator $duration linear infinite;
    animation-play-state: paused;
}

.spinner.show {
    opacity: 1;
    animation-play-state: running;
}
@keyframes rotator {
    0% {
        transform: scale(.5) rotate(0deg);
    }
    100% {
        transform: scale(.5) rotate(360deg);
    }
}

.spinner .path {
    stroke: $color;
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash $duration ease-in-out infinite;
}
@keyframes dash {
    0% {
        stroke-dashoffset: $offset;
    }
    50% {
        stroke-dashoffset: ($offset/2);
        transform: rotate(180deg);
    }
    100% {
        stroke-dashoffset: $offset;
        transform: rotate(360deg);
    }
}
</style>
