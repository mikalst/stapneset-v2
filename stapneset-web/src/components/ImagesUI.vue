<template>
  <div id="images_app">
    <div style="height: 20vh; "></div>
    <ImageElement
      v-bind:id="idx"
      v-for="[idx, url] of image_urls_lr.entries()"
      v-bind:image_url_hr="image_urls_hr[idx]"
      v-bind:image_url_lr="image_urls_lr[idx]"
      v-bind:url="url"
      v-bind:key="idx"
      v-bind:idx="idx"
      v-bind:active_idx="active_idx"
    ></ImageElement>
      <div style="height: 60vh; "></div>
      </div>
    
</template>

<script>
import ImageElement from './ImageElement.vue'

export default {
  name: 'ImagesUI',
  components: {
    ImageElement
  },
  data: function() {
    return {
      image_urls_hr: [],
      image_urls_lr: ['/image_viewer_low_res/ender.jpg', 
                  '/image_viewer_low_res/familie.jpg',
                  '/image_viewer_low_res/flyfoto.jpg',
                  '/image_viewer_low_res/gaarden.jpg', 
                  '/image_viewer_low_res/hund.jpg',
                  '/image_viewer_low_res/smistein.png'],
      scrolled: false,
      window_y_pos: 0,
      element_height: 0,
      active_idx: 0
    }
  },
  methods: {
    changeFocused() {
      let idx_closest_element = 0;
      let val_closest_element = 10000;
      for (let i = 0; i < 6; i++){
        let elementBoundingClientRect = document.getElementById(i).getBoundingClientRect();
        let dist = Math.abs(window.innerHeight / 2 - (elementBoundingClientRect.y + elementBoundingClientRect.height));
        if (dist < val_closest_element){
          idx_closest_element = i;
          val_closest_element = dist;
        }
        this.active_idx = idx_closest_element
      }
    },
    handleScroll () {
      let current_window_y_pos = window.pageYOffset;
      if (Math.abs(current_window_y_pos - this.window_y_pos) > 50){
        this.window_y_pos = current_window_y_pos;
        this.changeFocused();
        // console.log(this.image_urls_hr);
      } 
    },
    setImageUrls(filename_array){
      console.log(filename_array);
      let url_array = [];
      let url_array_lr = [];
        for (let i = 0; i < filename_array.length; i++){
          url_array.push("http://localhost:7071/api/fetch-images?file="+filename_array[i]);
          url_array_lr.push("image_viewer_low_res/"+filename_array[i]);
        }
      this.image_urls_hr = url_array;
      this.image_urls_lr = url_array_lr;
    }
  },
  async created () {
    window.addEventListener('scroll', this.handleScroll);
    this.element_height = Math.floor(window.innerHeight / 2);
    const res = await fetch('http://localhost:7071/api/fetch-images'+`?list=true`);
    const data = await res.json();
    this.setImageUrls(data["filenames"]);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
</style>
