<template>
  <transition name="fade" v-if="pageloaded">
    <div class="link" :style="style">
    <h1>{{ msg }}</h1>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'Greeting',
  props: {
    msg: String,
    toppct: Number,
    leftpct: Number,
    delay: Number
  },
  computed: {
    style () {
      return 'top: ' + this.toppct + '% ; left: ' + this.leftpct + '%';
    }
  },
  data() {
    return {
      pageloaded: false,
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
</style>



