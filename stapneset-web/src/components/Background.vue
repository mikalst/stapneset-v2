<template>
<div>
<fake3d-image-effect
centered
fill-height-content
image="/imgs/stapneset-depth-copy.jpg"
image-map="/imgs/stapneset-depth-map-copy.jpg">
</fake3d-image-effect>
</div>
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



