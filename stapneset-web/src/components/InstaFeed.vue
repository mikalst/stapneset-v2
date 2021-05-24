<template>
  <div id="images_app" style="height: 100%; ">
    <div style="height: 20vh; ">
    <InstaElement
      v-for="el in d"
      v-bind:key="el.id"
      v-bind:url="el.media_url"
    ></InstaElement>
  </div>
  <div style="height: 60vh; "></div>
  </div>
</template>

<script>
import InstaElement from './InstaElement.vue'

export default {
  name: 'InstaFeed',
  components: {
    InstaElement
  },
  data: function () {
    return {
      d: {
        type: Array,
        default: [null, null]
      }
    }
  },
  async created () {
    const res = await fetch(process.env.VUE_APP_API_PATH+"fetch-instagram");
    const json = await res.json();
    this.d = json["data"];
  }
}
</script>