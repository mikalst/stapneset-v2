<template>
  <div id="landingpage">
    <Hyperlink msg="Here comes history." :top="true" :left="true" delay="1"/>
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
