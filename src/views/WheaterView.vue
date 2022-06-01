<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search...">
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
  date() {
    return{
      api_key: '803a7cd7089cd54e3ecc37bf1b6a3340'
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'montserrat', sans-serif;
}
#app {
  background-image: url('./src/assets/cold.jpg');
  background-size: cover;
  background-position: center;
  transition: .4s;
}
main {
  max-width: 100vh;
}
</style>