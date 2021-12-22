<template>
  <html>
    <WeatherUI></WeatherUI>
  </html>
</template>

<script>
import WeatherUI from './components/WeatherUI.vue';

export default {
  name: 'App',
  components: {
    WeatherUI
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
