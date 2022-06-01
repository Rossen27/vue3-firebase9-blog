<template>
  <div class="navbar bg-base-100 bg-white dark:bg-gray-800">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 dark:text-gray-300 dark:hover:text-white" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <router-link to="/about"
              class="btn btn-ghost text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">ABOUT
            </router-link>
          </li>
          <li tabindex="0">
            <a
              class="btn btn-ghost justify-between text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              Services
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </a>
            <ul class="p-2 shadow menu menu-compact dropdown-content bg-base-100">
              <li>
                <router-link to="/maskmap"
                  class="btn btn-ghost text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Mask
                  Map</router-link>
              </li>
              <li><a
                  class="btn btn-ghost text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Submenu
                  2</a></li>
            </ul>
          </li>
          <li><a
              class="btn btn-ghost text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Blog</a>
          </li>
        </ul>
      </div>
      <router-link to="/" class="btn btn-ghost normal-case text-lg"><svg xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg></router-link>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        <li>
          <router-link to="/about"
            class="btn btn-ghost text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">ABOUT
          </router-link>
        </li>
        <li tabindex="0">
          <a class="btn btn-ghost text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white ">
            Services
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </a>
          <ul class="p-2 shadow menu menu-compact dropdown-content bg-base-100">
            <li>
              <router-link to="/maskmap"
                class="btn btn-ghost text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Mask
                Map</router-link>
            </li>
            <li><a
                class="btn btn-ghost text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Submenu
                2</a></li>
          </ul>
        </li>
        <li><a class="btn btn-ghost text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Blog</a>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/vue3-firebase9-blog-45c59.appspot.com/o/Navbar%2FBmo.jpg?alt=media&token=fde847c4-a8bb-4f87-ae81-8623076c707a" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li v-if="isLoggedIn">
            <button
              class="btn btn-ghost linkStyle py-3 text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Settings</button>
          </li>
          <li v-if="isLoggedIn">
            <button
              class="btn btn-ghost linkStyle py-3 text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              @click="handleSignOut"> Log Out </button>
          </li>
          <li v-else="isLoggedIn">
            <button
              class="btn btn-ghost linkStyle py-3 text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              <router-link to="/login"> Log In </router-link>
            </button>
          </li>
        </ul>
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