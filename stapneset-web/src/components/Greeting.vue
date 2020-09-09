<template>
  <transition name="slide-fade" v-if="pageloaded">
    <div class="link">
    <a>{{ msg }}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Hyperlink',
  props: {
    msg: String,
    delay: String,
    color: {
      default: 'azure',
      type: String
    }
  },
  data() {
    return {
      pageloaded: false,
    };
  },
  created() {
    setTimeout(() => { this.pageloaded = true; }, this.delay*500);
    setTimeout(() => { this.pageloaded = false; }, this.delay*3000);
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .link{
      position: absolute;
      z-index: 1;
      top: 5%;
      left: 5%;
      width: 90%;
      font-size: 7vw;
      text-align: center;
  }
}
@media screen and (min-width: 601px) {
  .link{
      position: absolute;
      z-index: 1;
      top: 5%;
      left: 5%;
      width: 90%;
      font-size: 42px;
      text-align: center;
  }
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>



