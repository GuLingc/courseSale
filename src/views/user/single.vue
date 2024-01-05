<template>
  <div class="single" v-loading="loadings">
    <el-container style="flex-direction: row-reverse">
      <el-aside width="300px">
        <h3 style="margin-bottom: 20px">相关推荐</h3>
        <ul>
          <li v-for="(item, index) in aboutCourse" :key="index">
            <div class="courseCover" @click="goBack(item.courseId)">
              <img :src="item.coursePicture" alt="" />
            </div>
            <div class="datas">
              <p>{{ item.courseTitle }}</p>
              <p>{{ item.lecturerName }}</p>
            </div>
          </li>
        </ul>
      </el-aside>
      <el-container>
        <el-header>
          <h3>{{ courseInfos.courseTitle }}</h3>
          <p>
            浏览量:{{ courseInfos.courseNum
            }}<span>{{ courseInfos.courseTime }}</span>
          </p>
        </el-header>
        <el-main>
          <video :id="playerId" class="video-js">
            <source
              src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/post/20240105224534_鱼香肉丝.mp4"
              type="video/mp4"
            />
          </video>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted, ref, watchEffect } from "vue";
import { viewById, viewByLecturer, browse } from "@/api/user";
import { useRouter, useRoute } from "vue-router";
import videojs from "video.js";
let courseInfos = ref<any>({});
let aboutCourse = ref<any>({});
let playerId = ref("myVideo");
let loadings = ref(false);
onMounted(() => {
  loadings.value = true;
  addViews();
  singleCourse();
  initVideo();
});
let router = useRouter();
let route = useRoute();
let courseId = ref(route.query.courseId);
const addViews = () => {
  let data = {
    courseId: courseId.value,
  };
  browse(data).then((res) => {
    console.log("浏览量", res);
  });
};
let goBack = (id: number) => {
  router.push({ path: "/single", query: { courseId: id } });
};
const initVideo = () => {
  //初始化视频方法
  let myPlayer = videojs(playerId.value, {
    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
    controls: true,
    //自动播放属性,muted:静音播放
    autoplay: "muted",
    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
    preload: "auto",
    //设置视频播放器的显示宽度（以像素为单位）
    width: "800px",
    //设置视频播放器的显示高度（以像素为单位）
    height: "400px",
  });
  loadings.value = false;
};
const singleCourse = () => {
  let data = {
    courseId: courseId.value,
  };
  viewById(data)
    .then((res: any) => {
      if (res.code == 20000) {
        courseInfos.value = res.data;
        let obj = {
          lecturerId: res.data.lecturerId,
        };
        viewByLecturer(obj).then((res) => {
          console.log("相关课程", res.data);
          aboutCourse.value = res.data;
        });
      } else {
        ElMessage.error("获取课程信息失败");
      }
    })
    .catch((error) => {
      ElMessage.error("获取课程信息失败");
    });
};
</script>

<style lang="scss" scoped>
.single {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 130px;
  color: white;
}
.el-header {
  color: #cdd2d7;
  font-size: 16px;
  p {
    padding: 15px 0 20px 40px;
  }
  span {
    margin-left: 30px;
  }
}
ul {
  li {
    width: 300px;
    overflow: hidden;
    height: 180px;
    display: flex;
    justify-content: space-between;
    .courseCover {
      width: 150px;
      height: 180px;
      margin: 0 auto;
      overflow: hidden;
      img {
        width: 150px;
        height: 140px;
        object-fit: cover;
      }
    }
    .datas {
      flex: 1;
      font-size: 15px;
      margin-left: 8px;
      overflow: hidden;
      p {
        margin-bottom: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  li:hover {
    cursor: pointer;
  }
}
</style>
