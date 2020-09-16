<template>
  <div id="landingpage">
    <WeatherElement
      v-for="[idx, temp] of weather_data.entries()"
      v-bind:temperature="temp"
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
      weather_data: [0, 0, 0, 0]
    }
  },
  async created() {
    console.log(process.env.VUE_APP_API);
    let response = await fetch(`${process.env.VUE_APP_API}`);
    let body = await response.json();
    this.weather_data = body;
  }
}
</script>

<style>
</style>
