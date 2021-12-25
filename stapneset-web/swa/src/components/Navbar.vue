<template>
<nav class="navbar navbar-light navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Stapneset.no</a>
  <button class="btn btn-primary" 
    type="button" 
    v-on:click="onClickButton"
    aria-expanded="false" 
    aria-controls="see_weather">
    {{ linkTexts[this.textId] }}
  </button>
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
      onClickButton () {
      console.log('emit');

      this.textId = (this.textId + 1)%2;
      this.$emit('weatherButtonClicked', '');
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