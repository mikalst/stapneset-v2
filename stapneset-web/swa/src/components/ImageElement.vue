<template>
  <div class="container">
    <div class="row image">
      <div class="col col-6 my-1">
        <b-img left fluid v-bind:src="url" />
      </div>
      <div class="col col-6 d-flex justify-content-center align-items-center">
        <b-card>
          some text goes here 
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageElement",
  props: {
    url: String,
  },
};
</script>

<style scoped>
</style>
