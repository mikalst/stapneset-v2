<template>
  <div id="app">
    <Background/>
    <Greeting msg="Welcome to Stapneset" leftpct="30" toppct="32" delay="1" color="LightSlategray"/>
    <Hyperlink msg="Weather" leftpct="5" toppct="10" delay="1"/>
    <Hyperlink msg="Images" leftpct="75" toppct="10" delay="2"/>
    <Hyperlink msg="History" leftpct="5" toppct="90" delay="3"/>
    <Hyperlink msg="Geocaching" leftpct="75" toppct="90" delay="4"/>
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
  margin-top: 60px;
}
</style>
