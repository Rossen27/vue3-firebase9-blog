<template>
  <div id="app" :class="weather?.main?.temp > 23 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search..." v-model="query" @keypress="fetchWeather" />
      </div>
      <div class="weather-wrap" v-if="weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}
            {{weather.sys.country}}
          </div>
          <div class="date">
            {{ dateBuilder() }}
          </div>
        </div>
        <div class="weather-box">
          <div class="temp">
            {{ Math.round(weather.main.temp) }}°c
          </div>
          <div class="weather">
            {{weather.weather.main}}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      api_key: '803a7cd7089cd54e3ecc37bf1b6a3340',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      temp: '',
      city: '',
      weather: {
        sys: {
          country: '',
        },
        main: {
          temp: 0
        },
        weather: {
          main: '',
        },
      },
    }
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    dateBuilder() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;
}

#app {
  background-image: url('https://firebasestorage.googleapis.com/v0/b/vue3-firebase9-blog-45c59.appspot.com/o/WeaterView%2Fcold.jpg?alt=media&token=3fadb43d-1a27-4385-a60e-591574d13f4e');
  background-size: cover;
  background-position: center;
  transition: .4s;
}

#app .warm {
  background-image: url('https://firebasestorage.googleapis.com/v0/b/vue3-firebase9-blog-45c59.appspot.com/o/WeaterView%2Fwarm.jpg?alt=media&token=f6ea2605-ed27-4d69-835f-20e0612a34da');
}

main {
  display: grid;
  grid-template-columns: 50% 50%;
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 6))
}

.search-box {
  width: 90%;
}

.search-box .search-bar {
  margin-top: 30vh;
  display: block;
  width: 100%;
  padding: 15px;
  color: #3d3434;
  font-size: 20px;
  border: none;
  background: none;
  outline: none;
  appearance: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, .25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: .4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, .25);
  background-color: rgba(255, 255, 255, .75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  margin-top: 10vh;
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, .25);
}

.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 100px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, .25);
  background-color: rgba(255, 255, 255, .25);
  border-radius: 16px;
  margin: 30px 0;
  box-shadow: 3px 6px rgba(0, 0, 0, .25);
}

.weather-box .weather {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, .25);
}
</style>