<template>
  <div id="weather_app" class="row">
    <WeatherElement
      v-for="[idx, sixHourPeriod] of weather_data.entries()"
      v-bind:time="new Date(Date.parse(sixHourPeriod.time))"
      v-bind:temperature="sixHourPeriod.details.air_temperature"
      v-bind:cloud_area_fraction="sixHourPeriod.details.cloud_area_fraction"
      v-bind:wind_speed="sixHourPeriod.details.wind_speed"
      v-bind:idx="idx"
      v-bind:key="idx"
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

<style></style>
