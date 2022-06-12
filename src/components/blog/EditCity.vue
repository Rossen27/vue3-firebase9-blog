<!-- <template>
    <div>
        <div class="container">
            <div class="row">
                <div class="">
                    <h2>Edit blog</h2>
                    <form @submit.prevent="updateBlog">
                        <div class="">
                            <input type="text" class="" placeholder="標題" v-model="blogInfo.title" />
                        </div>
                        <div class="form-group">
                            <input type="text" class="" placeholder="內文"
                                v-model="blogInfo.text" />
                        </div>
                        <div class="form-group">
                            <input type="date" class="" placeholder="日期"
                                v-model="blogInfo.date" />
                        </div>
                        <button class="">Update blog</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import blogsColRef from "../../main";
import { getDoc, doc, setDoc } from "firebase/firestore";
export default {
    data() {
        return {
            selectedBlog: {},
            BlogId: null,
            docRef: null,
            blogInfo: {
                title: null,
                text: null,
                date: null,
            },
        };
    },

    methods: {
        async getBlog() {
            let blogRef = doc(blogsColRef, this.blogId);
            this.docRef = blogRef;
            let blog = await getDoc(this.docRef);
            let blogData = blog.data();
            this.blogInfo.title = blogData.title;
            this.blogInfo.text = blogData.text;
            this.blogInfo.date = blogData.date;
        },
        async updateBlog() {
            await setDoc(this.docRef, this.blogInfo);
            alert(
                `名稱為 ${this.blogId} 更新成功!`
            );
            this.$router.push("/");
        },
    },

    created() {
        let blogId = this.$route.params.blogId;
        this.blogId = blogId;
        this.getBlog();
    },
};
</script>

<style>
</style> -->