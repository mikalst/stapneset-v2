<template>
  <div class="container image py-2">
    <b-row>
      <b-card>
      <b-img left rounded fluid-grow v-bind:src="url" class="py-6" />
        {{ caption }}
      </b-card>
    </b-row>
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
