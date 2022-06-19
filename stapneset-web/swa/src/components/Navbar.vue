<template>
  <nav class="navbar navbar-light navbar-expand-lg">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="#"
      >Stapneset.no</a>
      <b-button-group size="sm">
        <b-button
          type="button" 
          :pressed="textId==0"
          aria-expanded="false"
          aria-controls="see_weather" 
          variant="primary"
          @click="onClickButton(0)"
        >
          Vær
        </b-button>

        <b-button
          type="button" 
          :pressed="textId==1"
          aria-expanded="false"
          aria-controls="see_history" 
          variant="primary"
          @click="onClickButton(1)"
        >
          Område 
        </b-button>
  
        <b-button
          type="button" 
          :pressed="textId==2"
          aria-expanded="false"
          aria-controls="see_biology" 
          variant="primary"
          @click="onClickButton(2)"
        >
          Fauna
        </b-button>
  
        <b-button
          type="button" 
          :pressed="textId==3"
          aria-expanded="false"
          aria-controls="see_biology" 
          variant="primary"
          @click="onClickButton(3)"
        >
          Historie
        </b-button>

        <b-button
          type="button" 
          disabled
          aria-expanded="false"
          aria-controls="see_biology" 
          variant="primary"
          @click="onClickButton(4)"
        >
          Geocache
        </b-button>
      </b-button-group>
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
    },
  },
  data: function () {
    return {
      textId: 0,
    }
  },
  methods: {
      onClickButton (i) {
        this.textId = i;
        console.debug(`Navbar emitted 'onClickButton(${i})'`);
        this.$emit('weatherButtonClicked', i );
    }
  }
};
</script>

<style>
.navbar{
  display: flex;
  flex-direction: column;
}
</style>