<template>
  <div class="books">
    <LabelTypes />
    <div class="selectCourse">
      <el-card
        :body-style="{ padding: '0px' }"
        v-for="(course, o) in courseDatas"
        :key="o"
      >
        <div class="coverImg">
          <img :src="course.photo" class="image" />
        </div>
        <div style="padding: 0 14px 14px" class="cardBottom">
          <span>{{ course.title }}</span>
          <p>{{ course.level }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import LabelTypes from "@/components/labelTypes.vue";
import { ref, reactive } from "vue";
const courseDatas = reactive([
  {
    id: 1,
    title: "Mathematics",
    level: "我是一个课程名字1111111111",
    photo:
      "https://img2.baidu.com/it/u=270029723,3225860608&fm=253&fmt=auto&app=138&f=JPEG?w=656&h=500",
  },
  {
    id: 2,
    title: "Physics",
    level: "Advanced",
    photo:
      "https://img2.baidu.com/it/u=3653114115,3722914227&fm=253&fmt=auto&app=120&f=JPEG?w=396&h=500",
  },
  {
    id: 3,
    title: "Biology",
    level: "Beginner",
    photo:
      "https://img1.baidu.com/it/u=4153583684,635587465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
  },
  {
    id: 1,
    title: "Mathematics",
    level: "我是一个课程名字1111111111",
    photo:
      "https://img2.baidu.com/it/u=270029723,3225860608&fm=253&fmt=auto&app=138&f=JPEG?w=656&h=500",
  },
  {
    id: 2,
    title: "Physics",
    level: "Advanced",
    photo:
      "https://img2.baidu.com/it/u=3653114115,3722914227&fm=253&fmt=auto&app=120&f=JPEG?w=396&h=500",
  },
  {
    id: 3,
    title: "Biology",
    level: "Beginner",
    photo:
      "https://img1.baidu.com/it/u=4153583684,635587465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
  },
  {
    id: 1,
    title: "Mathematics",
    level: "我是一个课程名字1111111111",
    photo:
      "https://img2.baidu.com/it/u=270029723,3225860608&fm=253&fmt=auto&app=138&f=JPEG?w=656&h=500",
  },
  {
    id: 2,
    title: "Physics",
    level: "Advanced",
    photo:
      "https://img2.baidu.com/it/u=3653114115,3722914227&fm=253&fmt=auto&app=120&f=JPEG?w=396&h=500",
  },
  {
    id: 3,
    title: "Biology",
    level: "Beginner",
    photo:
      "https://img1.baidu.com/it/u=4153583684,635587465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
  },
]);
</script>

<style lang="scss" scoped>
.books {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 130px;
}
.selectCourse {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 30px;
  .el-card {
    width: calc(25% - 20px);
    overflow: hidden;
    background-color: transparent;
    border: none;
    margin-bottom: 15px;
    .coverImg {
      width: 100%;
      height: 200px;
      overflow: hidden;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: all 0.5s;
      }
      img:hover {
        cursor: pointer;
        transform: scale(1.3);
      }
    }
    .cardBottom {
      position: relative;
      color: white;
      text-align: center;
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
      p:hover {
        cursor: pointer;
      }
      span:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
