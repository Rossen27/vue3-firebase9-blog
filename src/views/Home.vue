<template>
  <div class="hero min-h-screen"
    style="background-image: url(https://firebasestorage.googleapis.com/v0/b/vue3-firebase9-blog-45c59.appspot.com/o/Home%2F2B955AD9-F4FB-44F4-8F29-B5E8C52FC5BE.jpeg?alt=media&token=5aaae039-99e3-487b-b86a-52667a4a3612);">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold anaglyph">Hello There</h1>
        <p class="mb-5 ">歡迎來到我的網頁</p>
        <router-link to="/about"> <button class="btn glass">WELCOME</button></router-link>
      </div>
    </div>
  </div>

  <div class="container mx-auto p-8">
    <div class="flex flex-wrap columns-3 p-8">
      <div class="p-8 max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
        v-for="(item, index) in usuarios" :key="index">
        <img class="object-cover rounded w-full h-56" :src="item.foto" alt="avatar">
        <div class="p-8 text-center">
          <h4 href="#" class="block text-2xl font-bold text-gray-800 dark:text-white">{{ item.nombre }}</h4>
          <span class="text-sm text-gray-700 dark:text-gray-200">{{ item.correo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
const router = useRouter();
const isLoggedIn = ref(false);
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

<script>
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from "../main";
export default {
  name: 'Home',
  data() {
    return {
      usuarios: [],
      usuario: {
        nombre: '',
        correo: '',
        foto: '',
        date: ''
      }
    }
  },
  methods: {
    // GET
    async obtenerDatos() {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      querySnapshot.forEach((doc) => {
        let usuario = doc.data()
        usuario.id = doc.id
        this.usuarios.push(usuario)
        console.log(usuario)
      });
    }
  },
  mounted() {
    this.obtenerDatos();
  },
}
</script>
<style>
/* .anaglyph {
letter-spacing: 6px;
text-shadow: red 0 0, cyan 0 0;
transition: text-shadow 200ms;
} */
/* .anaglyph:hover {
  text-shadow: red -6px 0, cyan 6px o;
} */
</style>