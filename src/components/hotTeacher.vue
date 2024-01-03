<template>
  <div class="hotTeacher">
    <ul>
      <li v-for="(item, index) in teacherDatas">
        <div class="headerPicture">
          <img :src="item.lecturer_picture" />
        </div>
        <div class="textTeacher">
          <h3>{{ item.leturer_name }}</h3>
          <p>{{ item.leturer_introduction }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const teacherDatas = reactive([
  {
    lecturer_id: 1,
    leturer_name: "Mathematics",
    leturer_introduction:
      "我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111我是一个课程名字1111111111",
    lecturer_picture:
      "https://img2.baidu.com/it/u=270029723,3225860608&fm=253&fmt=auto&app=138&f=JPEG?w=656&h=500",
  },
  {
    lecturer_id: 2,
    leturer_name: "Physics",
    leturer_introduction: "Advanced",
    lecturer_picture:
      "https://img2.baidu.com/it/u=3653114115,3722914227&fm=253&fmt=auto&app=120&f=JPEG?w=396&h=500",
  },
  {
    lecturer_id: 3,
    leturer_name: "Biology",
    leturer_introduction: "Beginner",
    lecturer_picture:
      "https://img1.baidu.com/it/u=4153583684,635587465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
  },
  {
    lecturer_id: 4,
    leturer_name: "Mathematics",
    leturer_introduction: "我是一个课程名字1111111111",
    lecturer_picture:
      "https://img2.baidu.com/it/u=270029723,3225860608&fm=253&fmt=auto&app=138&f=JPEG?w=656&h=500",
  },
]);
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: calc(50% - 20px);
    display: flex;
    justify-content: space-between;
    padding: 20px;
    .headerPicture {
      width: 150px;
      height: 150px;
      overflow: hidden;
      img {
        width: 150px;
        height: 150px;
        transition: all 0.5s;
      }
      img:hover {
        transform: scale(1.3);
      }
    }
    .textTeacher {
      width: calc(100% - 170px);
      h3 {
        margin-bottom: 8px;
        color: rgba(224, 225, 235, 1);
      }
      p {
        color: rgba(148, 150, 161, 1);
        font-size: 17px;
        font-family: emoji;
        line-height: 25px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
    }
  }
}
</style>
