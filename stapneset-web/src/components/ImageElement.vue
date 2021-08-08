<template>
<div>
  <img class="loading image" v-bind:src="url">
</div>
</template>


<script>
export default {
  name: 'ImageElement',
  props: {
    url: String,
  }
}
</script>

<style scoped>
.image{
  height: 80vh;
  max-width: 100vh; 
  align-content: center;
  z-index: 10;
}

/* ============= */
/* == Spinner == */
/* ============= */
img.loading {
    background: transparent url(../assets/spinner.gif) center center;
}
</style>



