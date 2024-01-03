<template>
  <div class="newCourse">
    <el-card
      :body-style="{ padding: '0px' }"
      v-for="(course, o) in courseDatas"
      :key="o"
      @mouseleave="handleMouse(o)"
      @mouseenter="handleMouse(o)"
    >
      <img :src="course.photo" class="image" />
      <div style="padding: 14px" class="cardBottom">
        <span>{{ course.title }}</span>
        <p v-show="course.introShow">{{ course.level }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const courseDatas = reactive([
  {
    id: 1,
    title: "Mathematics",
    level: "我是一个课程名字1111111111",
    photo:
      "https://img2.baidu.com/it/u=270029723,3225860608&fm=253&fmt=auto&app=138&f=JPEG?w=656&h=500",
    introShow: false,
  },
  {
    id: 2,
    title: "Physics",
    level: "Advanced",
    photo:
      "https://img2.baidu.com/it/u=3653114115,3722914227&fm=253&fmt=auto&app=120&f=JPEG?w=396&h=500",
    introShow: false,
  },
  {
    id: 3,
    title: "Biology",
    level: "Beginner",
    photo:
      "https://img1.baidu.com/it/u=4153583684,635587465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
    introShow: false,
  },
]);

function handleMouse(index: number) {
  courseDatas[index].introShow = !courseDatas[index].introShow;
}
</script>

<style lang="scss" scoped>
.newCourse {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 380px;
  .el-card {
    width: calc(33.3% - 20px);
    overflow: hidden;
    background-color: transparent;
    border: none;
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
    div {
      position: relative;
      color: white;
      text-align: center;
      margin-bottom: 10px;
      transition: all 0.5s;
      margin-left: 15px;
      margin-right: 15px;
      z-index: 5;
      p {
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: normal;
      }
    }
  }
  .el-card:hover .cardBottom {
    cursor: pointer;
    background-color: rgb(97, 59, 167);
    margin-top: -70px;
  }
}
</style>
