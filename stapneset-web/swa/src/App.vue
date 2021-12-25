<template>
  <html class="h-100 d-flex flex-column">
    <Navbar class="nonbg" @weatherButtonClicked="onClickedImages"/>
    <b-container fluid v-show="showWeather" class="h-100 px-4">
        <WeatherUI ></WeatherUI>
        <Background/>
    </b-container>
    <b-container fluid v-show="showWeather === false">
      <InstaFeed class="nonbg"/>
    </b-container>
  </html>
</template>

<script>
import WeatherUI from './components/WeatherUI.vue';
import Navbar from './components/Navbar.vue';
import Background from './components/Background.vue';
import InstaFeed from './components/InstaFeed.vue';

export default {
  name: 'App',
  components: {
    WeatherUI,
    Navbar,
    Background,
    InstaFeed
  },
  data() {
    return {
      tabIndex: 1,
      showWeather: true
    }
  },
  methods: {
    onClickedImages: function() {
      console.log('clicked');
      this.showWeather = !this.showWeather;
    }
  }
}
</script>

<style>
.html {
  z-index: 1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.nonbg {
  z-index: 10;
}
</style>
