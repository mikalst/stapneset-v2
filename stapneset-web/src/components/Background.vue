<template>
<transition name="fade">
  <div id="background-first-container">
    <div id="background-second-container" :style="style_second_container">
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
      style_second_container () {
        return "left: " + this.x_offset_mouse + "%;";
      }
    },
    data() {
      return {
        x_offset_mouse: {
          default: 0,
          type: Number
        }
      };
    },
    methods: {
      mouseIsMoving(e){
        this.x_offset_mouse = Math.cos(Math.PI*(window.innerWidth - e.pageX)/window.innerWidth)*5 - 5;
      }
    },
    mounted(){
      window.addEventListener('mousemove',this.mouseIsMoving);
      window.addEventListener('deviceorientation', function(event) {
        this.x_offset_orientation = event.alpha / 360;
      });
    },
    destroyed: function() {
      window.removeEventListener('mousemove', this.mouseIsMoving);
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
  height: 100%;
  width: 110%;
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



