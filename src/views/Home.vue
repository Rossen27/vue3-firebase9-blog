<template>
  <div class="hero min-h-screen"
    style="background-image: url(https://firebasestorage.googleapis.com/v0/b/vue3-firebase9-blog-45c59.appspot.com/o/Home%2F2B955AD9-F4FB-44F4-8F29-B5E8C52FC5BE.jpeg?alt=media&token=5aaae039-99e3-487b-b86a-52667a4a3612);">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Hello There</h1>
        <p class="mb-5">歡迎來到我的網頁</p>
        <button class="btn glass">WELCOME</button>
      </div>
    </div>
  </div>
  <!-- ! Cards -->
  <div class="card inline-block border border-gray-200 rounded-lg shadow-lg overflow-hidden">
    <div class="card__image h-64">
      <img class="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
        alt="Office with a plant">
    </div>
    <div class="card__copy space-y-4 px-4 py-2">
      <div class="card__title text-2xl" v-for="blog in blogs"
              :key="blog.id"
              >{{ blog.title }}</div>
      <div class="card__body text-base text-gray-600 pb-2">
        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex at obcaecati delectus ea vitae maiores modi
          sit quos consectetur adipisci dicta aliquam, nisi a, nulla mollitia iste voluptatibus recusandae
          dolorem?</span>
      </div>
      <button class="w-full rounded-lg py-2 text-center bg-black text-white hover:bg-gray-800 hover:text-gray-100">
        Learn More
      </button>
    </div>
  </div>
</template>

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
      alert("Blog deleted successully!");
      this.$router.go();
    },
  },
  created() {
    this.fetchBlogs();
  },
};

</script>


<style lang="scss" scoped>
.card {
  width: 30rem;
}
</style>

