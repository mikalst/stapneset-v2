<template>
  <div id="app">
    <Background/>
    <Greeting msg="Welcome to Stapneset" leftpct="50" toppct="50" delay="0"/>
    <Greeting msg="Weather" leftpct="5" toppct="10" delay="1"/>
    <Greeting msg="Images" leftpct="75" toppct="10" delay="2"/>
    <Greeting msg="History" leftpct="5" toppct="90" delay="3"/>
    <Greeting msg="Geocaching" leftpct="75" toppct="90" delay="4"/>
  </div>
</template>

<script>
import Greeting from './components/Greeting.vue'
import Background from './components/Background.vue'


export default {
  name: 'App',
  components: {
    Background,
    Greeting
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.0s ease-in;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
<!-- The CSS .fade-* classes are named after the 'fade' transition above -->
