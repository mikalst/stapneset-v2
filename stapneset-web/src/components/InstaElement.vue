<template>
<div>
    <img id="image" class="image" v-bind:src="url">
</div>
</template>


<script>
export default {
  name: 'ImageElement',
  props: ['url']
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}
.fade-enter {
  opacity: 0;
}
.blur{
  filter: blur(3px);
}
.image{
  height: 80vh;
  max-width: 100vh; 
  align-content: center;
  z-index: 10;
}
</style>



