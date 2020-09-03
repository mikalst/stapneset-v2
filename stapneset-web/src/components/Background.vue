<template>
<fake3d-image-effect
centered
fill-height-content
tag="div"
image="/imgs/stapneset-depth.jpg"
image-map="/imgs/stapneset-depth-map.jpg">
</fake3d-image-effect>
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



