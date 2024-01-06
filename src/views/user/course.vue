<template>
  <div class="books">
    <div class="labels">
      <ul>
        <li v-for="(item, index) in labels" :key="index">
          <div class="active">{{ item.typeName }}</div>
          <div
            :class="{ active: status === '全部' }"
            @click="changeType('全部', 0)"
          >
            全部
          </div>
          <div
            v-for="(child, o) in item.typeChildren"
            :key="o"
            :class="{ active: status === child.typeName }"
            @click="changeType(child.typeName, child.typeId)"
          >
            {{ child.typeName }}
          </div>
        </li>
      </ul>
    </div>
    <div class="selectCourse" v-if="courseDatas">
      <el-card
        :body-style="{ padding: '0px' }"
        v-for="(course, o) in courseDatas"
        :key="o"
        @click="goBack(course.courseId)"
      >
        <div class="coverImg">
          <img :src="course.coursePicture" class="image" />
        </div>
        <div style="padding: 0 14px 14px" class="cardBottom">
          <span>{{ course.lecturerName }}</span>
          <p>{{ course.courseTitle }}</p>
        </div>
      </el-card>
    </div>
    <el-empty v-if="!courseDatas" :image-size="200" />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { viewByType } from "@/api/user";
import { selectAll } from "@/api/manage";
import {useRouter} from "vue-router"
const courseDatas = ref<any[]>([]);
let status = ref("全部");
let labels = ref<any[]>([]);
onMounted(() => {
  gainHot(0);
  gainTypes();
});
let router = useRouter()
let goBack=(id:number)=>{
  router.push({path:'/single',query:{courseId:id}})
}
//获取类型
const gainTypes = () => {
  selectAll()
    .then((res) => {
      console.log("获取全部类型", res);
      labels.value = res.data;
    })
    .catch((error) => {
      ElMessage.error("获取类型失败");
    });
};
//获取课程
const gainHot = (typeId: number) => {
  let data;
  if (typeId == 0) {
    data = {
      choice: 1,
    };
  } else {
    data = {
      choice: 1,
      typeId,
    };
  }
  viewByType(data).then((res) => {
    console.log("获取课程信息", res);

    courseDatas.value = res.data;
  });
};
//改变搜索的课程类型
const changeType = (typeName: string, typeId: number) => {
  status.value = typeName;
  gainHot(typeId);
};
</script>

<style lang="scss" scoped>
.books {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 130px;
}
.selectCourse {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  .el-card {
    width: calc(25% - 20px);
    overflow: hidden;
    background-color: transparent;
    border: none;
    margin-bottom: 15px;
    margin-right: 20px;
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
      text-align: center;
      transition: all 0.5s;
      margin-left: 15px;
      margin-right: 15px;
      font-size: 14px;
      color: #e1e2e4;
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

.labels {
  color: white;
  li {
    display: flex;
    div {
      margin-left: 20px;
    }
    div:hover {
      cursor: pointer;
    }
    .active {
      color: rgb(217 185 255);
    }
  }
}
</style>
