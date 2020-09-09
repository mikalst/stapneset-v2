<template>
  <div id="landingpage">
    <Hyperlink msg="Here comes the weather." :top="true" :left="true" delay="1"/>
  </div>
</template>

<script>
import Hyperlink from './Hyperlink.vue'


export default {
  name: 'App',
  components: {
    Hyperlink
  }
}
</script>

<style>
</style>
