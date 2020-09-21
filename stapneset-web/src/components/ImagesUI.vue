<template>
  <div id="images_app">
    <ImageElement
      v-for="[idx, url] of image_urls.entries()"
      v-bind:image_url="url"
      v-bind:delay="idx+1"
      v-bind:key="idx"
    ></ImageElement>
  </div>
</template>

<script>
import ImageElement from './ImageElement.vue'


export default {
  name: 'ImagesUI',
  components: {
    ImageElement
  },
  data: function() 
  {
    return {
      image_urls: ['/image_viewer/image1.jpg', 
                  '/image_viewer/image2.jpg',
                  '/image_viewer/image3.jpg',
                  '/image_viewer/image4.png', 
                  '/image_viewer/image6.jpg',
                  '/image_viewer/image7.jpg', 
                  '/image_viewer/image8.png']
    }
  }
}
</script>

<style>
</style>
