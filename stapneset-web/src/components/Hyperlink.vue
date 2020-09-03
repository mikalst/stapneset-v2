<template>
  <transition name="fade" v-if="pageloaded">
    <div class="link" :style="style">
      <h1>
    <a class="nonhighlight" v-on:mouseover="hover=true" v-on:mouseleave="hover=false" v-bind:class="{ highlight: hover }">{{ msg }}</a>
      </h1>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'Hyperlink',
  props: {
    msg: String,
    toppct: String,
    leftpct: String,
    delay: String,
    color: {
      default: 'azure',
      type: String
    },
  },
  computed: {
    style () {
      return 'top: ' + this.toppct + '%; ' + ' left: ' + this.leftpct + '%;'
        + 'color: ' + this.color;
    }
  },
  data() {
    return {
      pageloaded: false,
      hover: false
    };
  },
  created() {
    setTimeout(() => { this.pageloaded = true; }, this.delay*500);
  }
}
</script>

<style scoped>
.link{
  position: absolute;
  z-index: 1;
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



