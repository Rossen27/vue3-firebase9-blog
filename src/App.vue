<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="sticky-footer">
    <Navbar class="sticky-top"></Navbar>
    <router-view />
    <Footer class="sticky-bottom"></Footer>
  </div>
</template>

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
  background-repeat: no-repeat; /*使背景不重複*/
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
