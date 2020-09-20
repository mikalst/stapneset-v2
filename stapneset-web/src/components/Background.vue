<template>
<transition name="fade">
    <div class="">
        <fake3d-image-effect
        centered
        fill-height-content
        image="/imgs/stapneset-depth-copy.jpg"
        image-map="/imgs/stapneset-depth-map-copy.jpg">
        </fake3d-image-effect>
    </div>
</transition>
</template>

<script>
import { Fake3dImageEffect } from '@luxdamore/vue-fake3d-image-effect';
import '@luxdamore/vue-fake3d-image-effect/dist/Fake3dImageEffect.css';

export default {
    components: {
        'fake3d-image-effect': Fake3dImageEffect,
    },
};
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.0s ease-in-out;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>



