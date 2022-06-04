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
  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Title</th>
          <th>Text</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody v-for="blog in blogs" :key="blog.id">
        <!-- row 1 -->
        <tr>
          <td>{{ blog.title }}</td>
          <td>{{ blog.text }}</td>
          <td>{{ blog.date }}</td>
        </tr>
        <tr class="flex w-full" v-if="isLoggedIn">
          <td>
            <router-link :to="{ path: `/blogs/${blog.id}` }"
              class="grid h-20 flex-grow btn btn-glass btn-xs rounded-box place-items-center">修改</router-link>
          </td>
          <td class="divider divider-horizontal">OR</td>
          <td class="grid h-20 flex-grow btn btn-glass btn-xs rounded-box place-items-center"
            @click="deleteBlog(blog.id)">刪除</td>
        </tr>
      </tbody>
    </table>
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
import blogsColRef from "../main";
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
      alert("文章刪除完成!");
      this.$router.go();
    },
  },

  created() {
    this.fetchBlogs();
  },
};
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