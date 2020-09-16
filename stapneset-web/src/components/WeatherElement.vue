<template>
  <transition name="fade" v-if="pageloaded">
    <div class="base" v-bind:class="{ farleft: idx == 0, left: idx == 1, right: idx == 2, farright: idx == 3 }">

    <a class="nonhighlight" v-on:mouseover="hover=true" v-on:mouseleave="hover=false" v-bind:class="{ highlight: hover }">{{ temperature }}</a>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'WeatherElement',
  props: {
    temperature: Number,
    idx: Number
  },
  computed: {
  },
  data() {
    return {
      pageloaded: false,
      hover: false
    };
  },
  created() {
    setTimeout(() => { this.pageloaded = true; }, this.delay*300);
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .base{
    position: absolute;
    z-index: 1;
    top: 50%;
    width: 10%;
    word-wrap: normal;
    font-size: 7vw;
    text-align: right;
    color: azure;
  }
  .farleft{
    left: 12%;
  }
  .left{
    left: 34%;
  }
  .right{
    left: 56%;
  }
  .farright{
    left: 78%;
  }
}
@media screen and (min-width: 601px) {
  .base{
    position: absolute;
    z-index: 1;
    top: 50%;
    width: 10%;
    word-wrap: normal;
    font-size: 7vw;
    text-align: right;
    color: azure;
  }
  .farleft{
    left: 12%;
  }
  .left{
    left: 34%;
  }
  .right{
    left: 56%;
  }
  .farright{
    left: 78%;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.0s ease-in;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.highlight{
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out;
}
</style>



