<template>
  <div>
    <div style="height: 30vh" />
    <ImageElement
      v-for="url of image_urls"
      :key="url"
      :url="url"
      class="scrollsnapchild"
    />
    <div style="height: 30vh" />
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
  async created() {
    await this.fetchImageUrls();
  },
  methods: {
    async fetchImageUrls() {
      let res = await fetch(process.env.VUE_APP_API_PATH + "fetch-images");
      let json = await res.json();
      this.image_urls = shuffle(json);
      return;
    },
  },
};
</script>

<style>
</style>
