<template>
  <transition name="fade" v-if="pageloaded">
    <div size="lg"
      class="col"
      v-bind:class="{ farleft: idx == 0, left: idx == 1, right: idx == 2 }"
    >
      <p class="time">{{ days[time.getDay()] + "\n Kl." + time.getHours() }}</p>
      <p
        class="temp"
        v-on:mouseover="hover = true"
        v-on:mouseleave="hover = false"
        v-bind:class="{ highlight: hover }"
      >
        {{ temperature }}&deg;C
      </p>
      <b-icon v-if="cloud_icon=='wb_cloudy'" icon="cloud-haze" size="lg" class="icon">Cloudy</b-icon>
      <b-icon v-if="cloud_icon=='wb_sunny'" icon="sun-fill" size="lg" class="icon">Sunny</b-icon>
      <b-icon v-if="cloud_icon=='filter_drama'" icon="cloud-sun" size="lg" class="icon">Partly cloudy</b-icon>
      <p
        class="temp"
        v-on:mouseover="hover = true"
        v-on:mouseleave="hover = false"
        v-bind:class="{ highlight: hover }"
      >
        {{ wind_speed }}m/s
      </p>
    </div>
  </transition>
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
  width: 5rem;
  height: 5rem;
}
</style>
