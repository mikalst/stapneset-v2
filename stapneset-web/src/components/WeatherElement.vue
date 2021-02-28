<template>
  <transition name="fade" v-if="pageloaded">
    <div class="base" v-bind:class="{ farleft: idx == 0, left: idx == 1, right: idx == 2, farright: idx == 3 }">
    <p class="time">{{ time }}</p>
    <p class="temp" v-on:mouseover="hover=true" v-on:mouseleave="hover=false" v-bind:class="{ highlight: hover }">{{ temperature }}&deg;C</p>
    <i class="material-icons" style="font-size:7vw;"> {{ cloud_icon }}</i>
    <p class="temp" v-on:mouseover="hover=true" v-on:mouseleave="hover=false" v-bind:class="{ highlight: hover }">{{ wind_speed }}m/s</p>
  </div>
  </transition>
</template>


<script>
export default {
  name: 'WeatherElement',
  props: {
    time: String,
    temperature: Number,
    cloud_area_fraction: Number,
    wind_speed: Number,
    idx: Number
  },
  computed: {
  },
  data() {
    return {
      pageloaded: false,
      hover: false,
      cloud_icon: ""
    };
  },
  created() {
    setTimeout(() => { 
      this.pageloaded = true; 
      if (this.cloud_area_fraction > 80) {
        this.cloud_icon = "wb_cloudy";
      } else if (this.cloud_area_fraction > 40) {
        this.cloud_icon = "filter_drama";
      } else {
        this.cloud_icon = "wb_sunny";
      }
    }, 0);
  }
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/icon?family=Material+Icons";

@media screen and (max-width: 600px) {
  .base{
    position: absolute;
    z-index: 1;
    top: 40%;
    width: 10%;
    color: azure;
  }
  .time{
    text-align: center;
    font-size: 6vw;
  }
  .temp{
    font-size: 6vw;
  }
  .cloud{
    font-size: 6vw;
  }
  .farleft{
    left: 20%;
  }
  .left{
    left: 44%;
  }
  .right{
    left: 66%;
  }
  .farright{
    left: 78%;
  }
}
@media screen and (min-width: 601px) {
  .base{
    position: absolute;
    z-index: 1;
    top: 40%;
    width: 10%;
    color: azure;
  }
  .time{
    text-align: center;
    font-size: 36px;
  }
  .temp{
    font-size: 36px;
  }
  .cloud{
    font-size: 36px;
  }
  .farleft{
    left: 20%;
  }
  .left{
    left: 44%;
  }
  .right{
    left: 66%;
  }
  .farright{
    left: 78%;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.0s ease-in;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.highlight{
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out;
}
</style>



