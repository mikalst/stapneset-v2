<template>
  <div class="container image py-2 text-left">
    <!-- <b-img left rounded fluid-grow v-bind:src="url" class="py-6" /> -->
    <b-card :img-src="url" img-top >
      <b-card-text>
        {{ caption }} 
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ImageElement",
  props: {
    url: String,
    caption: String
  },
};
</script>

<style scoped>
.image {
  max-width: 650px;
}
</style>
