import {
  createStore
} from "vuex";
// import db from '../main';
// import {
//   collection,
//   getDocs,
//   orderBy
// } from "firebase/firestore";

export default createStore({
  state: {
    usuario: null,
    user: null,
    // 使用者目前所選縣市, 預設值為 臺北市
    currCity: '臺北市',
    // 使用者目前所選行政區, 預設值為 北投區
    currDistrict: '北投區',
    // 存放 API 回傳的 縣市/行政區的列表資訊
    location: [],
    // 存放 API 回傳的所有藥局資訊
    stores: [],
    keywords: '',
    showModal: false,
    infoBoxSid: null,
  },

  getters: {
      // 如果用戶存在則返回首頁
      existeUsuario(state){
        if(state.usuario === null){
          return false;
        }else{
          return true;
        }
      },
    cityList(state) {
      // 城市
      return state.location.map((d) => d.name);
    },
    districtList(state) {
      // 行政區, 利用 Optional Chaining 處理預設值問題
      return state.location.find((d) => d.name === state.currCity)?.districts || [];
    },
    filteredStores(state) {
      // 依縣市、行政區分組
      const { stores } = state;
      return stores.filter((d)=> d.county === state.currCity && d.town === state.currDistrict);
      
      // 加入關鍵字判斷功能
      return state.keywords
        ?stores.filter((d) => d.name.includes(state.keywords))
        :stores.filter((d) => d.county === state.currCity && d.town === state.currDistrict);
    },
    currDistrictInfo(state, getters) {
      // 目前所選行政區資訊
      return getters.districtList.find((d) => d.name === state.currDistrict) || {};
    },
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setcurrCity(state, payload) {
      state.currCity = payload;
    },
    setcurrDistrict(state, payload) {
      state.currDistrict = payload;
    },
    setAreaLocation(state, payload) {
      state.location = payload;
    },
    setStores(state, payload) {
      state.stores = payload;
    },
    setKeywords(state, payload) {
      state.keywords = payload;
    },
    setshowModal(state, payload) {
      state.showModal = payload;
    },
    setInfoBoxSid(state, payload) {
      state.infoBoxSid = payload;
    },
    // 以下為Firebase
  },
  actions: {
    // 從 onAuthStateChanged 接收數據(main.js)
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
    },
    // 取得行政區資料
    async fetchLocations({
      commit
    }) {
      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
        .then((res) => res.json());

      // 透過 commit 來操作 mutations
      commit('setAreaLocation', json);
    },
    // 取得藥局資料
    async fetchPharmacies({
      commit
    }) {
      const json = await fetch('https://kiang.github.io/pharmacies/json/points.json')
        .then((res) => res.json());

      // 整理資料格式，拆出經緯度
      const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1],
      }));

      // 透過 commit 來操作 mutations
      commit('setStores', data);
    },
  },
  modules: {},
});