<template>
  <div>
    <div style="height: 30vh"></div>
    <ImageElement
      v-for="url of image_urls"
      v-bind:url="url"
      v-bind:key="url"
      class="scrollsnapchild"
    ></ImageElement>
    <div style="height: 30vh"></div>
  </div>
</template>

<script>
import ImageElement from "./ImageElement.vue";
import shuffle from "../methods/shuffle.js";

export default {
  name: "ImagesUI",
  components: {
    ImageElement,
  },
  data: function () {
    return {
      image_urls: [],
    };
  },
  methods: {
    async fetchImageUrls() {
      let res = await fetch(process.env.VUE_APP_API_PATH + "fetch-images");
      let json = await res.json();
      this.image_urls = shuffle(json);
      return;
    },
  },
  async created() {
    await this.fetchImageUrls();
  },
};
</script>

<style>
</style>
