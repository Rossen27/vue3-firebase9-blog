<template>
  <div id="app">
    <aside-menu @triggerMarkerPopup="openPopup" ref="menu" />
    <mask-map ref="map" />
    <light-box />
  </div>
</template>
<script setup>
import asideMenu from '@/components/maskmap/asideMenu.vue';
import lightBox from '@/components/maskmap/lightbox.vue';
import maskMap from '@/components/maskmap/maskMap.vue';
</script>
<script>
import { mapActions } from 'vuex';


export default {
  name: 'maskmap',
  components: {
    asideMenu,
    lightBox,
    maskMap
  },
  methods: {
    ...mapActions(['fetchLocations', 'fetchPharmacies']),
    openPopup(id) {
      this.$refs.map.triggerPopup(id);
    },
  },
  mounted() {
    this.fetchLocations();
    this.fetchPharmacies();
  }
}
</script>

<style lang="scss" src="@/style.scss">
</style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  /*參考網址：https://ithelp.ithome.com.tw/articles/10224362*/
}

body {
  background-image: url("/Users/rossen/Desktop/vue3-firebase9-blog/src/assets/img/wave.svg");
  background-repeat: no-repeat;
  /*使背景不重複*/
  background-position: center;
}

.sticky-footer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* body設為100%的視窗高 */
}

.sticky-bottom {
  margin-top: auto;
  /* 利用flex特性，margin-top設auto後會自動計算上面有多少空間而將元素往下推移 */
}
</style>
