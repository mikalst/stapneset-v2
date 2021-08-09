<template class="scrollsnapchild">
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
@media screen and (max-width: 800px) {
  .image{
    width: 100vw;
    max-height: 70vh; 
    align-content: center;
    z-index: 10;
    object-fit: cover;
  }
}
@media screen and (min-width: 801px) {
  .image{
    width: 50vw;
    max-height: 90vh; 
    align-content: center;
    z-index: 10;
    object-fit: cover;
  }
}

/* ============= */
/* == Spinner == */
/* ============= */
img.loading {
    background: transparent url(../assets/spinner.gif) center center;
}
</style>



