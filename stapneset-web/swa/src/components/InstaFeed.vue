<template>
  <div id="images_app" >
    <div class="scrollsnapparent">
      <ImageElement
        v-for="el of imageData"
        v-bind:url="el.media_url"
        v-bind:caption="el.caption"
        v-bind:key="el.id"
        class="scrollsnapchild"
      ></ImageElement>
    </div>
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
