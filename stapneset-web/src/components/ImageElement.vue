<template>
  <transition name="fade" v-if="pageloaded">
    <div style="width: 100%; ">
    <img class="image" v-bind:src="image_url">
    </div>
  </transition>
</template>


<script>
export default {
  name: 'ImageElement',
  props: {
    image_url: String,
    delay: Number,
  },
    data() {
    return {
      pageloaded: false,
    };
  },
  created() {
    setTimeout(() => { this.pageloaded = true; }, this.delay*1000);
  }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.0s ease-in-out;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.highlight{
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out;
}
.image{
  width: 40%;
  align-content: center;
  z-index: 10;
}
</style>



