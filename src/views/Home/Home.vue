<template>
  <div class="home-container">
    <van-nav-bar fixed
  title="头条"
/>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" animation-duration="500" head-height="60">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<Article v-for="item in artlist" :key="item.id" :article="item"></Article>
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { articlesAPI } from '@/network/articlesAPI.js'
import Article from '@/components/Article/Article.vue'
export default {
name: 'Home',
data() {
  return {
   page: 1,
   limit: 10,
   // 文章的数组
   artlist: [],
   // 是否正在加载下一页数据
    loading: true,
      finished: false,
      isLoading: false
  }
},
created() {
  this.initArticleList()
},
components: {
  Article
},
methods: {
 async initArticleList(isRefresh) {
 const res = await articlesAPI(this.page, this.limit)
 // 是下拉刷新
 if (isRefresh) {
this.artlist = [...res, ...this.artlist]
 } else {
    // 上拉加载
   this.artlist = [...this.artlist, ...res]
   // console.log(this.artlist)
       this.loading = false
 }
  },
   onLoad() {
      // 异步更新数据
      // console.log(1)
      this.page++
      this.initArticleList()
        if (this.artlist.length >= 70) {
         this.finished = true
       }
   },
   onRefresh() {
     console.log(1)
     this.page++
      this.initArticleList(true)
      this.isLoading = false
        if (this.artlist.length >= 70) {
          this.artlist = []
         this.page = 0
         this.page++
      this.initArticleList(true)
       }
   }
}
}
</script>

<style lang="less"  scoped>
.home-container{
  padding:46px 0 50px 0;
}
</style>