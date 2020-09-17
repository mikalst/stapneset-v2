<template>
  <div id="landingpage">
    <WeatherElement
      v-for="[idx, sixHourPeriod] of weather_data.entries()"
      v-bind:time="sixHourPeriod.time_formatted"
      v-bind:temperature="sixHourPeriod.air_temperature"
      v-bind:cloud_area_fraction="sixHourPeriod.cloud_area_fraction"
      v-bind:cloud_icon="sixHourPeriod.cloud_icon"
      v-bind:wind_speed="sixHourPeriod.wind_speed"
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
    let response = await fetch(`${process.env.VUE_APP_API}`);
    let body = await response.json();
    this.weather_data = body;
  }
}
</script>

<style>
</style>
