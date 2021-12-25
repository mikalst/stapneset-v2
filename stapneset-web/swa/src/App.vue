<template>
  <html class="h-100 d-flex flex-column">
    <Navbar class="nonbg" @weatherButtonClicked="onClickedImages"/>
    <b-container fluid v-show="tabIndex == 0" class="h-100 px-4">
        <WeatherUI ></WeatherUI>
        <Background/>
    </b-container>
    <b-container fluid v-if="tabIndex == 1">
      <InstaFeed :imageData="sceneryData" class="nonbg"/>
    </b-container>
    <b-container fluid v-if="tabIndex == 2">
      <InstaFeed :imageData="biologyData" class="nonbg"/>
    </b-container>
    <b-container fluid v-if="tabIndex == 3">
      <InstaFeed :imageData="historyData" class="nonbg"/>
    </b-container>
  </html>
</template>

<script>
import shuffle from "./methods/shuffle";

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
      tabIndex: 0,
      showWeather: true,
      sceneryData: {},
      historyData: {},
      biologyData: {}
    }
  },
  methods: {
    onClickedImages: function(event) {
      console.log('clicked');
      this.tabIndex = (event) % 5;
    },
    async fetchImageUrls() {
      let res = await fetch(process.env.VUE_APP_API_PATH + "fetch-instagram");
      let json = await res.json();
      this.rawImageData = shuffle(json["data"]);
      console.log(this.rawImageData);

      this.sceneryData = this.rawImageData.filter(
        function(x) { 
          return x.caption?.toLowerCase().includes("#område") ?? false },
        this
      );
      this.historyData = this.rawImageData.filter(
        function(x) { 
          return x.caption?.toLowerCase().includes("#hist") ?? false},
        this
      );
      this.biologyData = this.rawImageData.filter(
        function(x) { 
          return x.caption?.toLowerCase().includes("#bio") ?? false},
        this
      );

      return;
    }
  },
  async created() {
    await this.fetchImageUrls();
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
