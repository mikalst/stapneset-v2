<template>
  <transition name="fade" v-if="pageloaded">
    <div class="base">
    <a class="nonhighlight" v-on:mouseover="hover=true" v-on:mouseleave="hover=false" v-bind:class="{ highlight: hover }">
    {{ msg }}
    </a>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'Homebutton',
  props: {
    msg: String,
    color: {
      default: 'azure',
      type: String
    },
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
    setTimeout(() => { this.pageloaded = true; }, 300);
  }
}
</script>

<style scoped>
.base{
  position: absolute;
  top: 5%;
  left: 5%;
  width: 10%;
  z-index: 100;
  word-wrap: normal;
  text-align: left;
  color: darkslategrey;
  mix-blend-mode: color-burn;
}
@media screen and (max-width: 600px) {
  .base{
    font-size: 7vw;
  }
}
@media screen and (min-width: 601px) {
  .base{
    font-size: 42px;
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



