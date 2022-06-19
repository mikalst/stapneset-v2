<template>
  <b-col variant="light" right class="nonbg wide text-center">
    <b-icon
      v-if="cloud_icon == 'wb_cloudy'"
      variant="light"
      icon="cloud-haze"
      size="lg"
      class="icon"
      >Cloudy
    </b-icon>
    <b-icon
      v-if="cloud_icon == 'wb_sunny'"
      variant="light"
      icon="sun-fill"
      size="lg"
      class="icon"
      >Sunny
    </b-icon>
    <b-icon
      v-if="cloud_icon == 'filter_drama'"
      variant="light"
      icon="cloud-sun"
      size="lg"
      class="icon"
      >Partly cloudy
    </b-icon>
  </b-col>
  <b-col variant="light" class="nonbg wide text-center">
    <b-row variant="light">
      <b-badge variant="light">
        {{ days[time.getDay()] + "\n Kl." + time.getHours() }}
      </b-badge>
    </b-row>
    <b-row variant="light">
      <b-badge> {{ temperature }}&deg;C </b-badge>
    </b-row>
    <b-row variant="light">
      <b-badge> {{ wind_speed }} m/s </b-badge>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: "WeatherElement",
  props: {
    time: Date,
    temperature: Number,
    cloudAreaFraction: Number,
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
      if (this.cloudAreaFraction > 80) {
        this.cloud_icon = "wb_cloudy";
      } else if (this.cloudAreaFraction > 40) {
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
  .wide {
    flex: 1 1 100%;
  }
}
.icon {
  width: 3rem;
  height: 3rem;
}
</style>
