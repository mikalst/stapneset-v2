<template>
  <div class="container image py-2 text-left">
    <b-card :img-src="url" img-top >
      <b-card-text v-for="paragraph in paragraphs" :key="paragraph">
        {{ paragraph }} 
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ImageElement",
  props: {
    url: String,
    caption: String,
    paragraphs: Array,
    links: Array
  },
};
</script>

<style scoped>
.image {
  max-width: 650px;
}
</style>
