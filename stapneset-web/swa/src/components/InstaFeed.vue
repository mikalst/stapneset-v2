<template>
  <div id="images_app" >
      <ImageElement
        v-for="el of imageData"
        v-bind:url="el.media_url"
        v-bind:paragraphs="el.paragraphs"
        v-bind:key="el.id"
        class="scrollsnapchild"
      ></ImageElement>
  </div>
</template>

<script>
import ImageElement from "./ImageElement.vue";

export default {
  name: "InstaFeed",
  components: {
    ImageElement,
  },
  props: {
    imageData: {
      Type: Array,
      default: [ ]
    }
  }
};
</script>
<style scoped>
</style>
