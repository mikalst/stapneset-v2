<template>
  <div id="app">
    <Background/>
    <Greeting msg="Welcome to Stapneset" leftpct="30" toppct="12" delay="1" color="LightSlategray"/>
    <Hyperlink msg="Weather (coming soon)" :top="true" :left="true" delay="1"/>
    <Hyperlink msg="Images (coming soon)" :top="false" :left="true" delay="2"/>
    <Hyperlink msg="History (coming soon)" :top="true" :left="false" delay="3"/>
    <Hyperlink msg="Geocaching (coming soon)" :top="false" :left="false" delay="4"/>
  </div>
</template>

<script>
import Hyperlink from './components/Hyperlink.vue'
import Greeting from './components/Greeting.vue'
import Background from './components/Background.vue'


export default {
  name: 'App',
  components: {
    Greeting,
    Hyperlink,
    Background
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
  margin-top: 0px;
}
</style>
