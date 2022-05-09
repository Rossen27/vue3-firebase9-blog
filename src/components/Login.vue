<template>
<div class="w-full h-screen flex flex-col-reveresed">

	<img src="https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="background" class="object-cover object-center h-screen w-7/12">

	<div class="bg-white flex flex-col justify-center items-center w-5/12 shadow-lg">
		<h1 class="text-3xl font-bold text-gray-500 mb-2">使用者登入</h1>
		<div class="w-1/2 text-center">
			<input type="text" name="username" placeholder="Username" autocomplete="off" class="shadow-md border w-full h-10 px-3 py-2 text-gray-500 focus:outline-none focus:border-gray-500 mb-3 rounded" v-model="email">
			<input type="password" name="password" placeholder="Password" autocomplete="off" class="shadow-md border w-full h-10 px-3 py-2 text-gray-500 focus:outline-none focus:border-gray-500 mb-3 rounded" v-model="password">
      <p v-if="errMsg">{{ errMsg }}</p>
			<button class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-lg focus:outline-none shadow" @click="register">Log In</button>
		</div>
	</div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('登入成功!');

      console.log(auth.currentUser);

      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "格式不符合";
          break;
        case "auth/user-not-found":
          errMsg.value = "找不到使用者";
          break;
        case "auth/wrong-password":
          errMsg.value = "密碼錯誤";
          break;
        default:
          errMsg.value = "電子郵件或密碼不正確";
          break;
      }
    });
};
</script>
<style>
</style>