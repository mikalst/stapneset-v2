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
    cleanCaptions(imageData, caption) {
      var filtered = imageData.filter(
        function(x) { 
          return x.caption?.toLowerCase().includes(
            caption.toLowerCase()) ?? false },
        this
      );

      filtered.forEach(element => {
        element.caption = (element.caption ?? "").replace(caption, "");
      });
      filtered.forEach(element => {
        element.caption = (element.caption ?? "").replace(caption.toLowerCase(), "");
      });

      return filtered;
    },
    sortAccordingToIndexTag(imageData) {
      var regex = /\[(?<index>[\d]*)\]/m;
      imageData.forEach(d => {
          let match = d.caption?.match(regex);
          d.index = match?.groups?.index ?? 999 
          if (match) {
            console.debug(match);
            d.caption = d.caption?.substring(0, match.index) + d.caption?.substring(match.index + match?.[0].length, d.caption.length);
          }
        }
      );
      return imageData.sort((a, b) => a.index - b.index);
    },
    async fetchImageUrls() {
      let res = await fetch(process.env.VUE_APP_API_PATH + "fetch-instagram");
      let json = await res.json();
      this.rawImageData = 
        this.sortAccordingToIndexTag(json["data"]);

      this.sceneryData = this.cleanCaptions(this.rawImageData, "#Område");

      this.historyData = this.cleanCaptions(this.rawImageData, "#Historie");
      
      this.biologyData = this.cleanCaptions(this.rawImageData, "#Fauna");

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
