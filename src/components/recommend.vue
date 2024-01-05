<template>
  <div class="recommend">
    <div
      v-for="(item, index) in courseData"
      :key="index"
      class="recommend-item"
    >
      <el-card
        v-if="item.length != 0"
        :body-style="{ padding: '0px' }"
        v-for="(course, o) in item"
        :key="o"
      >
        <img :src="course.coursePicture" class="image" />
        <div style="padding: 14px">
          <span>{{ course.lecturerName }}</span>
          <p>{{ course.courseTitle }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { viewByType } from "@/api/user";
import { onMounted, ref } from "vue";
let courseData = ref<any[]>([[], [], []]);
onMounted(() => {
  gainHot();
});
const gainHot = () => {
  let data = {
    choice: 1,
  };
  viewByType(data).then((res) => {
    let k = Math.ceil(res.data.length / 3);
    let datas = res.data;
    console.log(datas);
    courseData.value[0] = datas.slice(0, k);
    courseData.value[1] = datas.slice(k, k * 2);
    courseData.value[2] = datas.slice(k * 2);
  });
};
</script>

<style lang="scss" scoped>
.recommend {
  display: flex;
  justify-content: space-between;
  .recommend-item {
    width: calc(33.3% - 20px);
    overflow: hidden;
    .el-card {
      position: relative;
      width: 100%;
      background-color: transparent;
      border: none;
      top: 50px;
      transition: all 0.7s;
      cursor: pointer;
      .image {
        background-color: transparent;
        width: 100%;
        display: block;
        height: auto;
        max-height: 400px;
        object-fit: cover;
      }
      div {
        color: white;
        text-align: center;
        margin-bottom: 30px;
        p {
          font-size: 16px;
          color: rgb(217, 217, 218);
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: normal;
        }
      }
    }
    .el-card:hover {
      top: 30px;
    }
  }
}
</style>
