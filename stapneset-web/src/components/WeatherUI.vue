<template>
  <div id="weather_app">
    <WeatherElement
      v-for="[idx, sixHourPeriod] of weather_data.entries()"
      v-bind:time="sixHourPeriod.time_formatted"
      v-bind:temperature="sixHourPeriod.air_temperature['_']"
      v-bind:cloud_area_fraction="sixHourPeriod.cloud_area_fraction['_']"
      v-bind:wind_speed="sixHourPeriod.wind_speed['_']"
      v-bind:idx="idx"
      v-bind:key="idx"
    ></WeatherElement>
  </div>
</template>

<script>
import WeatherElement from './WeatherElement.vue'


export default {
  name: 'WeatherUI',
  components: {
    WeatherElement
  },
  data: function () { 
    return {
      weather_data: []
    }
  },
  async created() {
    let response = await fetch(process.env.VUE_APP_API_PATH+"fetch-weather");
    console.log(response);
    let body = await response.json();
    console.log(body);
    this.weather_data = body["data"];
  }
}
</script>

<style>
</style>
