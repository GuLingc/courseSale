<template>
  <div class="hotTeacher">
    <ul>
      <li v-for="(item, index) in teacherDatas">
        <div class="headerPicture">
          <img :src="item.lecturerPicture" />
        </div>
        <div class="textTeacher">
          <h3>{{ item.lecturerName }}</h3>
          <p>{{ item.lecturerIntroduction }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { hostLecturer } from "@/api/user";
import { onMounted, ref } from "vue";
let teacherDatas = ref<any[]>([])
onMounted(() => {
  hotTeacher();
});
const hotTeacher = () => {
  hostLecturer().then((res: any) => {
    teacherDatas.value = res.data
  });
};
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
