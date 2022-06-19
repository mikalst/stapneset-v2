<template>
  <div class="row align-items-center h-100">
    <WeatherElement
      v-for="[idx, sixHourPeriod] of weather_data.entries()"
      :key="idx"
      :idx="idx"
      :time="new Date(Date.parse(sixHourPeriod.time))"
      :temperature="sixHourPeriod.details.air_temperature"
      :cloud_area_fraction="sixHourPeriod.details.cloud_area_fraction"
      :wind_speed="sixHourPeriod.details.wind_speed"
    ></WeatherElement>
  </div>
</template>

<script>
import WeatherElement from "./WeatherElement.vue";

export default {
  name: "WeatherUI",
  components: {
    WeatherElement,
  },
  data: function () {
    return {
      weather_data: [],
    };
  },
  async created() {
    let response = await fetch(process.env.VUE_APP_API_PATH + "fetch-weather");
    let body = await response.json();
    this.weather_data = [
      {
        time: body.data.current.time,
        details: body.data.current.data.instant.details,
      },
      {
        time: body.data.tomorrow.time,
        details: body.data.tomorrow.data.instant.details,
      },
      {
        time: body.data.dayafter.time,
        details: body.data.dayafter.data.instant.details,
      },
    ];
    console.debug(this.weather_data);
  },
};
</script>

<style>
.weather {
  text-align: right;
  min-width: 400px;
}
.nonbg {
  z-index: 10;
}
</style>