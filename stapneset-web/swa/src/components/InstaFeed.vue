<template>
  <div id="images_app">
    <div class="d-flex justify-content-center flex-wrap my-4">
        <b-button variant="primary" class="mx-1 mb-2"
          v-on:click="selectTag(null)">
          Alle
        </b-button>
        <b-button
          v-for="tag in new Set(imageData.map(d => d.tags).flat())"
          :key="tag"
          v-on:click="selectTag(tag)"
          variant="success"
          class="mx-1 mb-2"
        >
          {{ tag }}
        </b-button>
    </div>
    <ImageElement
      v-for="el of filteredData"
      :key="el.id"
      :url="el.media_url"
      :paragraphs="el.paragraphs"
      class="scrollsnapchild"
    />
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
  },
  methods: {
    selectTag: function(tag)
    {
      console.debug(`Velger tag '${tag}'`);
      this.tag = tag;
    }
  },
  data() {
    return {
      tag: null
    }
  },
  computed: 
  {
    filteredData: function() {
      return this.imageData.filter(x => this.tag ? x.tags.includes(this.tag) : true);
    }
  }
};
</script>
<style scoped>
</style>
