<template>
  <div id="images_app" >
    <div class="scrollsnapparent">
      <ImageElement
        v-for="el of image_urls"
        v-bind:url="el.media_url"
        v-bind:caption="el.caption"
        v-bind:key="el.id"
        class="scrollsnapchild"
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
      console.log(this.image_urls);
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
  scroll-snap-type: y proximity;
  overflow: hidden;
}
#images_app {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
