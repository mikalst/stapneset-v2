<template>
<div v-bind:class="{ blur: getBlur() }">
  <transition name="fade">
    <img id="image" class="image" v-bind:src="getImageURL()" v-on:load="onLoadedImage" v-show="pageloaded">
  </transition>
</div>
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
    active_idx: Number,
  },
  data() {
    return {
      pageloaded: false,
      load_high_res: false
    };
  },
  methods: {
    getBlur: function () {
      return !(this.active_idx ==this.idx);
    },
    getImageURL: function () {
      //console.log(this.image_url_hr);
      if (this.load_high_res || this.active_idx == this.idx){
        this.load_high_res = true;
        return this.image_url_hr;
      }
      return this.image_url_lr;
    },
    onLoadedImage: function() {
      this.pageloaded = true;
    }
  },
  created() {
    // setTimeout(() => { this.pageloaded = true; }, this.delay*1000);
  }
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}
.fade-enter {
  opacity: 0;
}
.blur{
  filter: blur(3px);
}
.image{
  width: 100%;
  max-width: 100vh; 
  align-content: center;
  z-index: 10;
}
</style>



