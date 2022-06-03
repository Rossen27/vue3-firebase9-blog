<template>
  <div class="home min-h-screen bg-gray-200 flex items-center justify-center flex-wrap">
    <!-- card 1-->
    <div id="card" class="relative m-4 ">
      <!--outline backgroun -->
      <div id="outline" class="bg-green-300 absolute rounded-xl h-full w-full -left-2 -top-2"></div>
      <!-- content -->

      <div id="content" class="p-8 w-72 bg-gray-100 rounded-xl shadow-lg relative space-y-7">
        <ul class="list-group">
          <div class="bg-green-300 h-3 w-16 ml-auto"></div>
          <li v-for="blog in blogs" :key="blog.id" class="text-7xl"> <h1>{{ blog.title }}</h1>
                      <span v-if="isLoggedIn" >
              <router-link :to="{ path: `/blogs/${blog.id}` }" class="btn btn-glass">修改</router-link>
              <a href="#" class="btn btn-glass" @click="deleteBlog(blog.id)">刪除</a>
            </span>
          </li>
          <li v-for="blog in blogs" :key="blog.id">
            <p class="text-gray-500">{{ blog.text }}</p>
          </li>
          <li v-for="blog in blogs" :key="blog.id">
            <p class="text-gray-500">{{ blog.date }}</p>
          </li>
          <li>
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

<script>
import blogsColRef from "../main.js";
import { getDocs, doc, deleteDoc } from "firebase/firestore";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      blogs: [],
      selectedDoc: null,
    };
  },
  methods: {
    async fetchBlogs() {
      let blogsSnapShot = await getDocs(blogsColRef);
      let blogs = [];
      blogsSnapShot.forEach((blog) => {
        let blogData = blog.data();
        blogData.id = blog.id;
        blogs.push(blogData);
      });
      console.log(blogs);
      this.blogs = blogs;
    },
    async deleteBlog(blogId) {
      let blogRef = doc(blogsColRef, blogId);
      await deleteDoc(blogRef);
      alert("Blog deleted successully!");
      this.$router.go();
    },
  },

  created() {
    this.fetchBlogs();
  },
};
</script>