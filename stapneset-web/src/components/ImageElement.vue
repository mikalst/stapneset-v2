<template>
  <transition name="fade" v-if="pageloaded">
    <div v-bind:class="{ blur: getBlur() }">
    <img id="image" class="image" v-bind:src="getImageURL()">
    </div>
  </transition>
</template>


<script>
export default {
  name: 'ImageElement',
  props: {
    image_url_hr: String,
    image_url_lr: String,
    blurred_array: Array,
    idx: Number,
    element_height: Number,
    active_idx: Number
  },
  data() {
    return {
      pageloaded: false,
    };
  },
  methods: {
    getBlur: function () {
      return !(this.active_idx ==this.idx);
    },
    getImageURL: function () {
      console.log(this.image_url_hr);
      if (this.active_idx == this.idx){
        return this.image_url_hr;
      }
      return this.image_url_lr;
    }
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
  width: 50%; 
  align-content: center;
  z-index: 10;
}
.blur{
  filter: blur(0px);
}
</style>



