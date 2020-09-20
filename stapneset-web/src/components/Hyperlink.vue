<template>
  <transition name="fade" v-if="pageloaded">
    <div class="base" v-bind:class="{ top: top, left: left }">
    <a class="nonhighlight" v-on:mouseover="hover=true" v-on:mouseleave="hover=false" v-bind:class="{ highlight: hover }">
      {{ msg }}
      </a>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'Hyperlink',
  props: {
    msg: String,
    top: Boolean,
    left: Boolean,
    delay: String,
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
    setTimeout(() => { this.pageloaded = true; }, this.delay*300);
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .base{
    position: absolute;
    z-index: 1;
    top: 75%;
    left: 55%;
    width: 40%;
    word-wrap: normal;
    font-size: 7vw;
    text-align: right;
    color: azure;
  }
  .top{
    top: 25%;
    color: darkslategray;
  }
  .left{
    left: 5%;
    text-align: left;
  }
}
@media screen and (min-width: 601px) {
  .base{
    position: absolute;
    z-index: 1;
    top: 75%;
    left: 55%;
    width: 40%;
    word-wrap: normal;
    font-size: 42px;
    text-align: right;
    color: azure;
  }
  .top{
    top: 25%;
    color: darkslategray;
  }
  .left{
    left: 5%;
    text-align: left;
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



