<template>
  <div id="background-first-container">
    <div id="background-second-container">
      <img src="/imgs/stapneset-depth.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Background",
  components: {},
  computed: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
#background-first-container {
  display: flex;
  flex: 0 1 auto;
  overflow: hidden;
  z-index: 0;
  width: 100vw;
}
#background-second-container {
  position: fixed;
  top: 0%;
  left: -5%;
  height: 100vh;
  width: 110%;
  overflow: hidden;
  background-image: "/imgs/stapneset-depth.jpg";
}
img {
  z-index: 0;
  height: 100vh;
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
  0% {
    left: -4%;
  }
  100% {
    left: 0%;
  }
}
</style>
