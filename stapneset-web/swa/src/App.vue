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
import processCaption from './methods/processCaption';

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
      console.debug(`Received onClickedImages(${event})`);
      this.tabIndex = (event) % 5;
    },
    async fetchImageUrls() {
      let res = await fetch(process.env.VUE_APP_API_PATH + "fetch-instagram");
      let json = await res.json();

      this.rawImageData = json.data.map(x => processCaption(x));

      var processedData = this.rawImageData.sort((a, b) => a.index - b.index);

      this.sceneryData = processedData.filter(x => x.area === "område");
      this.historyData = processedData.filter(x => x.area === "historie");
      this.biologyData = processedData.filter(x => x.area === "fauna");

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
  color: #2c3e50;
  height: 100vh;
}
.nonbg {
  z-index: 10;
}
</style>
