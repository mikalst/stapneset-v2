<template>
  <div id="landingpage">
    <Hyperlink msg="Here comes a geocaching overview. " :top="true" :left="true" delay="1"/>
  </div>
</template>

<script>
import Hyperlink from './Hyperlink.vue'


export default {
  name: 'GeocachingUI',
  components: {
    Hyperlink
  }
}
</script>

<style>
</style>
