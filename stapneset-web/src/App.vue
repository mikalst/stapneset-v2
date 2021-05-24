<template>
  <div id="app">
    <Background v-show="show_background"/>

    <div v-on:click="home" v-if="!show_home">
    <Homebutton msg="Home"/>
    </div>

    <div  v-if="show_image_button" v-on:click="transition_to_image_view">
    <Hyperlink msg="Images" :top="false" :left="true"/>
    </div>

    <div  v-if="show_weather_button" v-on:click="transition_to_weather_view">
    <Hyperlink msg="Weather" :top="true" :left="true"/>
    </div>

    <div  v-if="show_history_button" v-on:click="transition_to_history_view">
    <Hyperlink msg="History" :top="true" :left="false"/>
    </div>
    
    <div  v-if="show_geocaching_button" v-on:click="transition_to_geocaching_view">
    <Hyperlink msg="Instagram" :top="false" :left="false"/>
    </div>
    
    <div v-if="show_weather">
    <WeatherUI/>
    </div>

    <div v-if="show_images">
    <ImagesUI/>
    </div>

    <div v-if="show_history">
    <HistoryUI/>
    </div>

    <div v-if="show_geocaching">
    <InstaFeed/>
    </div>

  </div>
</template>

<script>
import Hyperlink from '@/components/Hyperlink.vue'
import Homebutton from '@/components/Homebutton.vue'
import Background from '@/components/Background.vue'

import WeatherUI from '@/components/WeatherUI.vue'
import ImagesUI from '@/components/ImagesUI.vue'
import InstaFeed from '@/components/InstaFeed.vue'
import HistoryUI from '@/components/HistoryUI.vue'

export default {
  name: 'App',
  components: {
    Hyperlink,
    Homebutton,
    Background,
    WeatherUI,
    ImagesUI,
    InstaFeed,
    HistoryUI
  },
  data: function () { 
    return {
      show_background: true,
      show_home: true,
      show_weather: false,
      show_images: false,
      show_history: false,
      show_geocaching: false,
      show_image_button: true,
      show_weather_button: true,
      show_history_button: true,
      show_geocaching_button: true
    }
  },
  methods: {
    home: function()
    {
      this.show_home = true;
      this.show_background = true;
      this.show_images = false;
      this.show_weather = false;
      this.show_history = false;
      this.show_geocaching = false;
      this.show_image_button = true;
      this.show_weather_button = true;
      this.show_history_button = true;
      this.show_geocaching_button = true;
    },
    hide_all_buttons: function ()
    {
      this.show_image_button = false;
      this.show_weather_button = false;
      this.show_history_button = false;
      this.show_geocaching_button = false;
    },
    transition_to_weather_view: function()
    {
      this.hide_all_buttons()
      this.show_home = false;
      this.show_weather=true;
    },
    transition_to_image_view: function()
    {
      this.hide_all_buttons()
      this.show_home = false;
      this.show_images = true;
      this.show_background = false;
    },
    transition_to_history_view: function()
    {
      this.hide_all_buttons()
      this.show_home = false;
      this.show_history = true;
    },
    transition_to_geocaching_view: function()
    {
      this.hide_all_buttons()
      this.show_home = false;
      this.show_geocaching = true;
      this.show_background = false;
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
