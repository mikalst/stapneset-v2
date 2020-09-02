<template>
<fake3d-image-effect
centered
fill-height-content
tag="div"
image="/imgs/stapneset-depth.jpg"
image-map="/imgs/stapneset-depth-map.jpg">
    <div class="container" style="left-align">
        <transition name="fade" v-if="pageloaded">
        <div class="greeting">
        <h1 style="color: aliceblue;">{{ msg }}</h1>
        </div>
        </transition>
    </div>
</fake3d-image-effect>
</template>

<script>
import { Fake3dImageEffect } from '@luxdamore/vue-fake3d-image-effect';
import '@luxdamore/vue-fake3d-image-effect/dist/Fake3dImageEffect.css';

export default {
    components: {
        'fake3d-image-effect': Fake3dImageEffect,
    },
    props: {
        msg: String
    },
    data() {
        return {
        pageloaded: false,
        };
    },
    created() {
        setTimeout(() => { this.pageloaded = true; }, 300);
    }
};
</script>



