<template>
  <div class="container mx-auto p-8 ">
    <section class="w-full max-w-2xl p-8 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">Welcome to leave a message for me
      </h2>
      <p class="mt-3 text-center text-gray-600 dark:text-gray-400">歡迎留言給我</p>
      <div class="mt-6 ">
        <div class="items-center -mx-2 md:flex">
          <div class="w-full mx-2">
            <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">用戶名稱</label>

            <input
              class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text" v-model="usuario.nombre">
          </div>

          <div class="w-full mx-2 mt-4 md:mt-0">
            <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">E-mail</label>

            <input
              class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="email" v-model="usuario.correo">
          </div>
          <div class="w-full mx-2 mt-4 md:mt-0">
            <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Date</label>

            <input
              class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="date" v-model="usuario.date">
          </div>
        </div>
        <label for="dropzone-file"
          class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col justify-center items-center pt-5 pb-6">
            <svg class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" @change="buscarImagen($event)" />
        </label>
        <div class="w-full mt-4">
          <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Message</label>

          <textarea
            class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            v-model="usuario.message"></textarea>
        </div>

        <div class="flex justify-center mt-6">
          <button
            class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            v-show="this.editar === true" @click.prevent="actualizarDato(id)">Updata</button>
          <button
            class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            v-show="this.editar === false" @click.prevent="agregarDato()">Send
            Message</button>
        </div>
        <img :src="datoImagen">
      </div>
    </section>
    <!-- ////////// 添加表格 ////////// -->
    <!-- ////////// tabla ////////// -->
    <div class="overflow-x-auto p-8">
      <table class="table w-full">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">用戶名稱</th>
            <th scope="col">Email</th>
            <th scope="col">編輯</th>
            <th scope="col">DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usuarios" :key="index" class="bg-gray-200 hover">
            <th scope="row">{{ index }}</th>
            <td>{{ item.nombre }}</td>
            <td>{{ item.correo }}</td>
            <td>
              <button @click.prevent="obtenerDatoID(item.id); this.editar = !this.editar;"
                class="btn btn-active btn-ghost btn-sm">編輯
              </button>
            </td>
            <td>
              <button @click.prevent="eliminarDato(item.id)" class="btn btn-outline btn-error btn-sm">DELETE
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db, storage } from "../../main";
import firebase from 'firebase/compat/app';
import router from '../../router/index';

export default {
  name: 'AddCity',
  data() {
    return {
      file: null,
      datoImagen: null,
      error: null,
      editar: false,
      loading: false,

      usuarios: [],
      usuario: {
        nombre: '',
        correo: '',
        foto: '',
        date: '',
        message: '',
      }
    }
  },
  methods: {
    async obtenerDatos() {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      querySnapshot.forEach((doc) => {
        let usuario = doc.data()
        usuario.id = doc.id
        this.usuarios.push(usuario)
        console.log(usuario)
      });
    },
    // DELETE 
    async eliminarDato(id) {
      await deleteDoc(doc(db, "usuarios", id));
      // router.go('/')
    },
    // GET BY ID 
    async obtenerDatoID(id) {
      const docRef = doc(db, "usuarios", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.usuario = docSnap.data()
        this.usuario.id = docSnap.id
      }
      else {
        console.log("文件不存在！");
      }
    },

    // SEARCH IMAGE
    buscarImagen(event) {
      const tipoArchivo = event.target.files[0].type;
      if (tipoArchivo === 'image/jpeg' || tipoArchivo === 'image/png') {
        this.file = event.target.files[0]
        this.error = null
      }
      else {
        this.error = '無效文件'
        this.file = null
        return
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.datoImagen = e.target.result
      }
    },
    // 上傳圖片存儲
    async agregarDato() {
      try {
        this.loading = true
        var storageRef = firebase.storage().ref();
        await storageRef.child('imagenes').child(this.file.name).put(this.file)
        const urlDescarga = await storageRef.child('imagenes').child(this.file.name).getDownloadURL()
        await addDoc(collection(db, "usuarios"), {
          nombre: this.usuario.nombre,
          correo: this.usuario.correo,
          date: this.usuario.date,
          message: this.usuario.message,
          foto: urlDescarga
        })
        this.error = '圖片上傳成功'
        this.file = null
      }
      catch (error) {
        console.log(error);
      }
      finally {
        router.push('/')
        this.loading = false
      }
    },

    // Update
    async actualizarDato() {
      try {
        this.loading = true
        var storageRef = firebase.storage().ref();
        await storageRef.child('imagenes').child(this.file.name).put(this.file)
        const urlDescarga = await storageRef.child('imagenes').child(this.file.name).getDownloadURL()
        const elemento = doc(db, "usuarios", this.usuario.id)
        await updateDoc(elemento, {
          nombre: this.usuario.nombre,
          correo: this.usuario.correo,
          date: this.usuario.date,
          message: this.usuario.message,
          foto: urlDescarga
        })
        this.error = '圖片上傳成功'
        this.file = null
      }
      catch (error) {
        console.log(error);
      }
      finally {
        router.push('/')
        this.loading = false
      }
    }
  },
  mounted() {
    this.obtenerDatos();
  },
}

</script>