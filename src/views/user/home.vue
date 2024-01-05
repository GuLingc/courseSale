<template>
  <div class="home">
    <div class="containers"></div>
    <div class="main">
      <div class="lecturer">
        <div class="detail">
          <div class="aboutUs"></div>
          <div class="title"><h2>金牌讲师</h2></div>
          <p style="text-indent: 0em; font-size: 18px">
            {{ firstTeacher.lecturerName }}
          </p>
          <p>
            {{ firstTeacher.lecturerIntroduction }}
          </p>
        </div>
        <div
          class="lecturerHeader"
          :style="{
            backgroundImage: `url(${
              firstTeacher.lecturerPicture ||
              'https://26823097.s61i.faiusr.com/2/AD0IuZPlDBACGAAg26rrggYoo7eSzwEwgA84zAg.jpg'
            })`,
          }"
        ></div>
      </div>
      <div class="courseTeacher">
        <div
          class="aboutUs"
          style="
            background-image: url('https://26823097.s61i.faiusr.com/4/AD0IuZPlDBAEGAAg-7L1ggYo8KzBgAIwvQM4KQ.png.webp');
          "
        ></div>
        <div class="title">
          <h2>热门课程</h2>
          <div></div>
        </div>
        <Recommend />
      </div>
      <div class="courseTeacher">
        <div
          class="aboutUs"
          style="
            background-image: url('https://26823097.s61i.faiusr.com/4/AD0IuZPlDBAEGAAgrur1ggYops30nAMw0QM4KQ.png.webp');
          "
        ></div>
        <div class="title">
          <h2>最新课程</h2>
          <div></div>
        </div>
        <NewCourse />
      </div>
      <div class="courseTeacher">
        <div
          class="aboutUs"
          style="
            background-image: url('https://26823097.s61i.faiusr.com/4/AD0IuZPlDBAEGAAgiIL2ggYo3eegrQQw6QM4KQ.png.webp');
          "
        ></div>
        <div class="title">
          <h2>热门讲师</h2>
          <div></div>
        </div>
        <HotTeacher />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Recommend from "@/components/recommend.vue";
import NewCourse from "@/components/newCourse.vue";
import HotTeacher from "@/components/hotTeacher.vue";
import { hostLecturer } from "@/api/user";
import { onMounted, ref } from "vue";
let firstTeacher = ref<any>({});
let teachers = ref<any[]>([]);
  let userInfo = JSON.parse(window.localStorage.getItem("userInfo")||"")
onMounted(() => {
  hotTeacher();
});
const hotTeacher = () => {
  hostLecturer().then((res: any) => {
    console.log("金牌讲师", res);
    firstTeacher.value = res.data[0];
    teachers.value = res.data;
  });
};
</script>

<style lang="scss" scoped>
.containers {
  height: 100vh;
  background-image: url("https://26823097.s61i.faiusr.com/2/AD0IuZPlDBACGAAg26rrggYoo7eSzwEwgA84zAg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.main {
  max-width: 1200px;
  margin: 0 auto;
  font-family: emoji;
}
.lecturer {
  display: flex;
  height: 340px;
  padding: 20px;
  margin-top: 30px;
  color: white;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: rgb(97, 58, 171);
  .detail {
    padding: 20px 0 20px 40px;
    width: 640px;
    .aboutUs {
      height: 40px;
      background-image: url("https://26823097.s61i.faiusr.com/4/AD0IuZPlDBAEGAAgqrTrggYo-ue3iwUwjQI4KQ.png.webp");
      background-repeat: no-repeat;
    }
    p {
      font-size: 16px;
      text-indent: 2em;
      color: rgb(193, 184, 210);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 7;
      overflow: hidden;
    }
  }
  .lecturerHeader {
    background-color: red;
    height: 380px;
    width: 400px;
    margin-top: -40px;
    margin-right: 40px;
    background-image: url("@/assets/images/back1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
}
.courseTeacher {
  margin-top: 160px;
  .aboutUs {
    width: 460px;
    height: 40px;
    margin: 0 auto;
    background-repeat: no-repeat;
  }
  .title {
    text-align: center;
    div {
      width: 40px;
      height: 2px;
      margin: 20px auto 0px;
      background-color: rgb(98, 58, 170);
    }
  }
}
.title {
  position: relative;
  top: -21px;
  color: white;
}
@media (max-width: 1024px) {
  .lecturerHeader {
    display: none;
  }
  .detail {
    width: 100% !important;
  }
}
</style>
