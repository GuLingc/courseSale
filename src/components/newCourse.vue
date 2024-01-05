<template>
  <div class="newCourse">
    <el-card
      :body-style="{ padding: '0px' }"
      v-for="(course, o) in courseDatas"
      :key="o"
      @mouseleave="handleMouse(o)"
      @mouseenter="handleMouse(o)"
    >
      <img :src="course.coursePicture" class="image" />
      <div style="padding: 14px" class="cardBottom">
        <span>{{ course.lecturerName }}</span>
        <p v-show="course.introShow">{{ course.courseTitle }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { viewByType } from "@/api/user";
import { ref, onMounted } from "vue";
const courseDatas = ref<any[]>([]);
onMounted(() => {
  gainHot();
});
const gainHot = () => {
  let data = {
    choice: 0,
  };
  viewByType(data).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      let datas = res.data[i];
      let introShow = false;
      courseDatas.value.push({ ...datas, introShow });
      if(i == 2)return
    }
  });
};
function handleMouse(index: number) {
  courseDatas.value[index].introShow = !courseDatas.value[index].introShow;
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
