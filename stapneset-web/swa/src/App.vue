<template>
  <Navbar class="nonbg"/>
  <html>
    <WeatherUI class="nonbg"></WeatherUI>
    <InstaFeed class="nonbg"/>
  </html>
  <!-- <Background/> -->
</template>

<script>
import WeatherUI from './components/WeatherUI.vue';
import Navbar from './components/Navbar.vue';
// import Background from './components/Background.vue';
import InstaFeed from './components/InstaFeed.vue';

export default {
  name: 'App',
  components: {
    WeatherUI,
    Navbar,
    // Background,
    InstaFeed
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
}
.nonbg {
  z-index: 10;
}
</style>
