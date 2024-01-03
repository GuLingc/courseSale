<template>
  <div class="home">
    <div class="bookCarousel">
      <el-carousel height="400px">
        <el-carousel-item v-for="item in photos" :key="item">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-container>
      <el-aside width="200px"><NovelGenre /></el-aside>
      <el-container>
        <el-main>
          <div class="aboutUs">
            <div class="title">
              <span>关于我们</span>
            </div>
            <div class="storeDetail">
              <div class="storePhotos">
                <img src="@/assets/images/storeImg.png" alt="" />
              </div>
              <div class="storeText">
                <h2>书店介绍</h2>
                <p>
                  引领阅读风尚，分享知识与文化我们的书店不仅销售书籍，更是分享知识与文化的平台。我们关注读者的需求和兴趣，定期举办各类阅读活动，引领阅读风尚，让阅读成为一种生活方式。
                </p>
              </div>
            </div>
          </div>
          <div class="books">
            <div class="title">
              <span>图书展示</span>
            </div>
            <BookViewsVue />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/appHeader.vue";
import NovelGenre from "@/components/novelGenre.vue";
import BookViewsVue from "@/components/bookViews.vue";
const photos = ["/src/assets/images/book.png", "/src/assets/images/store.jpg"];
</script>

<style lang="scss" scoped>
.bookCarousel {
  .el-carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.el-container {
  margin-top: 10px;
}
.el-main {
  padding-top: 0px;
  .title {
    border-bottom: 1px rgb(151, 151, 151) solid;
    span {
      display: inline-block;
      padding: 0px 10px 10px;
      font-size: 18px;
      border-bottom: 1px solid rgb(179, 106, 231);
    }
  }
  .aboutUs {
    .storeDetail {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 20px;
      padding-left: 15px;
      .storePhotos {
        width: 350px;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .storeText {
        flex: 1;
        padding: 25px 30px;
        p {
          min-width: 200px;
          margin-top: 30px;
          text-indent: 2rem;
          white-space: pre-line;
        }
      }
    }
  }
  .books {
    margin-top: 20px;
  }
}
</style>
