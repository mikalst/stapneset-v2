<template>
<transition name="fade">
  <div id="background-first-container">
    <div id="background-second-container">
      <img src="/imgs/stapneset-depth.jpg"/>
    </div>
  </div>
</transition>
</template>

<script>
export default {
    name: 'Background',
    components: {
    },
    computed: {
    },
    data() {
      return {
      };
    }
};
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.0s ease-in-out;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
#background-first-container {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}
#background-second-container {
  position: fixed;
  left: -5%;
  top: -5%;
  height: 110%;
  width: 110%;
  background-image: "/imgs/stapneset-depth.jpg"
}
img {
  height: 100%;
  min-width: 114%;
  position: absolute;
  animation-name: sway;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  object-fit: cover;
}
@keyframes sway {
  0% {left: -4%;}
  100% {left: 0%;}
}
</style>



