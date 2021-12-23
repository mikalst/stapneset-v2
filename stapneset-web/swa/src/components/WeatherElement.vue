<template>
  <div class="col nonbg">
    <b-icon v-if="cloud_icon=='wb_cloudy'" icon="cloud-haze" size="lg" class="icon">Cloudy</b-icon>
    <b-icon v-if="cloud_icon=='wb_sunny'" icon="sun-fill" size="lg" class="icon">Sunny</b-icon>
    <b-icon v-if="cloud_icon=='filter_drama'" icon="cloud-sun" size="lg" class="icon">Partly cloudy</b-icon>
  </div> 
  <div class="col nonbg">
    <div class="row">
      {{ days[time.getDay()] + "\n Kl." + time.getHours() }}
    </div>
    <div class="row">
      {{ temperature }}&deg;C
    </div>
    <div class="row">
      {{ wind_speed }} m/s
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherElement",
  props: {
    time: Date,
    temperature: Number,
    cloud_area_fraction: Number,
    wind_speed: Number,
    idx: Number,
    days: {
      type: Array,
      default: function () {
        return [
          "Søndag",
          "Mandag",
          "Tirsdag",
          "Onsdag",
          "Torsdag",
          "Fredag",
          "Lørdag",
        ];
      },
    },
  },
  computed: {},
  data() {
    return {
      pageloaded: false,
      hover: false,
      cloud_icon: "",
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
  },
};
</script>

<style scoped>
@import "https://fonts.googleapis.com/icon?family=Material+Icons";

@media screen and (max-width: 600px) {
  .base {
    z-index: 1;
  }
}
@media screen and (min-width: 601px) {
  .base {
    z-index: 1;
  }
  .time {
    text-align: center;
  }
}
.icon {
  width: 8vw;
  height: 8vw;
}
</style>
