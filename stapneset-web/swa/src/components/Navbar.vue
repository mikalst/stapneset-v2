<template>
<nav class="navbar navbar-light navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Stapneset.no</a>
  <b-button-group size="sm">
  <b-button
    type="button" 
    v-on:click="onClickButton(0)"
    aria-expanded="false" 
    aria-controls="see_weather">
    Vær
  </b-button>

  <b-button
    type="button" 
    v-on:click="onClickButton(1)"
    aria-expanded="false" 
    aria-controls="see_history">
    Område 
  </b-button>
  
  <b-button
    type="button" 
    v-on:click="onClickButton(2)"
    aria-expanded="false" 
    aria-controls="see_biology">
    Biologi
  </b-button>
  
  <b-button
    type="button" 
    v-on:click="onClickButton(3)"
    aria-expanded="false" 
    aria-controls="see_biology">
    Historie
  </b-button>

  <b-button
    type="button" 
    v-on:click="onClickButton(4)"
    disabled
    aria-expanded="false" 
    aria-controls="see_biology">
    Geocache
  </b-button>  </b-button-group>
  </div>
</nav>
</template>

<script>

export default {
  name: "Navbar",
  components: {
  },
  props: {
    linkTexts: {
      Type: Array,
      default: [ "Se bilder", "Se vær" ]
    }
  },
  data: function () {
    return {
      textId: 0,
    }
  },
  methods: {
      onClickButton (i) {
      console.log(`emit ${i}`);

      this.$emit('weatherButtonClicked', i );
    }
  }
};
</script>

<style>
.navbar{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>