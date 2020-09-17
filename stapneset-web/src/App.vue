<template>
  <div id="app">
    <Background/>
    <Greeting msg="Welcome to Stapneset" leftpct="30" toppct="12" delay="1" color="LightSlategray"/>

    <div v-on:click="home" v-if="view_index>0">
    <Homebutton msg="Home" delay="0"/>
    </div>

    <template v-if="view_index==0">
    <div v-on:click="view_index=1; ">
    <Hyperlink msg="Weather" :top="true" :left="true" delay="1"/>
    </div>
    <div v-on:click="view_index=2; ">
    <Hyperlink msg="Images (coming soon)" :top="false" :left="true" delay="2"/>
    </div>
    <div v-on:click="view_index=3; ">
    <Hyperlink msg="History (coming soon)" :top="true" :left="false" delay="3"/>
    </div>
    <div v-on:click="view_index=4; ">
    <Hyperlink msg="Geocaching (coming soon)" :top="false" :left="false" delay="4"/>
    </div>
    </template>
    
    <div v-if="this.view_index==1">
    <WeatherUI/>
    </div>

    <div v-if="this.view_index==2">
    <ImagesUI/>
    </div>

    <div v-if="this.view_index==3">
    <HistoryUI/>
    </div>

    <div v-if="this.view_index==4">
    <GeocachingUI/>
    </div>

  </div>
</template>

<script>
import Hyperlink from '@/components/Hyperlink.vue'
import Homebutton from '@/components/Homebutton.vue'
import Greeting from '@/components/Greeting.vue'
import Background from '@/components/Background.vue'

import WeatherUI from '@/components/WeatherUI.vue'
import ImagesUI from '@/components/ImagesUI.vue'
import GeocachingUI from '@/components/GeocachingUI.vue'
import HistoryUI from '@/components/HistoryUI.vue'

export default {
  name: 'App',
  components: {
    Hyperlink,
    Homebutton,
    Greeting,
    Background,
    WeatherUI,
    ImagesUI,
    GeocachingUI,
    HistoryUI
  },
  data: function () { 
    return {
      view_index: 0
    }
  },
  methods: {
    home: function()
    {
      this.view_index = 0;
    }
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
