<template>
  <div id="images_app" class="nonbg">
    <div class="scrollsnapparent nonbg">
      <ImageElement
        v-for="el of image_urls"
        v-bind:url="el.media_url"
        v-bind:key="el.id"
        class="scrollsnapchild nonbg"
      ></ImageElement>
    </div>
  </div>
</template>

<script>
import shuffle from "../methods/shuffle";
import ImageElement from "./ImageElement.vue";

export default {
  name: "InstaFeed",
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
      let res = await fetch(process.env.VUE_APP_API_PATH + "fetch-instagram");
      let json = await res.json();
      this.image_urls = shuffle(json["data"]);
      return;
    },
  },
  async created() {
    await this.fetchImageUrls();
  },
};
</script>
<style scoped>
.scrollsnapchild {
  scroll-snap-align: center;
}
.scrollsnapparent {
  scroll-snap-type: y mandatory;
  overflow: scroll;
  height: 100vh;
}
#images_app {
  overflow: hidden;
  height: 100vh;
}
</style>
