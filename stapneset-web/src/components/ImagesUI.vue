<template>
  <div id="images_app">
    <div style="height: 20vh; "></div>
    <ImageElement
      v-bind:id="idx"
      v-for="[idx, url] of image_urls.entries()"
      v-bind:url="url"
      v-bind:key="idx"
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
      image_urls: []
    }
  },
  methods: {
    async fetchImageUrls(){
      let res = await fetch(process.env.VUE_APP_API_PATH+"fetch-images");
      let json = await res.json();
      this.image_urls = json;
      return;
    }
  },
  async created () {
    window.addEventListener('scroll', this.handleScroll);
    this.element_height = Math.floor(window.innerHeight / 2);
    await this.fetchImageUrls();
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
</style>
