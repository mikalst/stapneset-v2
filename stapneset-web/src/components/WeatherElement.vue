<template>
  <transition name="fade" v-if="pageloaded">
    <div class="base" v-bind:class="{ farleft: idx == 0, left: idx == 1, right: idx == 2 }">
    <p class="time">{{ days[time.getDay()]+"\n Kl."+time.getHours() }}</p>
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
    time: Date,
    temperature: Number,
    cloud_area_fraction: Number,
    wind_speed: Number,
    idx: Number,
    days: {
      type: Array,
      default: function () {
        return ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
      }
    }
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
    top: 30%;
    width: 30%;
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
    left: 2.5%;
  }
  .left{
    left: 35%;
  }
  .right{
    left: 67.5%;
  }
}
@media screen and (min-width: 601px) {
  .base{
    position: absolute;
    z-index: 1;
    top: 30%;
    width: 30%;
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
    left: 2.5%;
  }
  .left{
    left: 35%;
  }
  .right{
    left: 67.5%;
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
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

</style>



