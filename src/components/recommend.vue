<template>
  <div class="recommend">
    <div
      v-for="(item, index) in courseDatas"
      :key="index"
      class="recommend-item"
    >
      <el-card
        :body-style="{ padding: '0px' }"
        v-for="(course, o) in item"
        :key="o"
      >
        <img :src="course.photo" class="image" />
        <div style="padding: 14px">
          <span>{{ course.title }}</span>
          <p>{{ course.level }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const courseDatas = [
  [
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
  ],
  [
    {
      id: 3,
      title: "Biology",
      level: "Beginner",
      photo:
        "https://img1.baidu.com/it/u=4153583684,635587465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
    },
    {
      id: 4,
      title: "Chemistry",
      level: "Intermediate",
      photo:
        "https://img0.baidu.com/it/u=2848184596,3588162484&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    },
  ],
  [
    {
      id: 5,
      title: "History",
      level: "Advanced",
      photo:
        "https://img2.baidu.com/it/u=3653114115,3722914227&fm=253&fmt=auto&app=120&f=JPEG?w=396&h=500",
    },
    {
      id: 6,
      title: "Literature",
      level: "Intermediate",
      photo:
        "https://img0.baidu.com/it/u=3832526735,1654676040&fm=253&fmt=auto&app=138&f=JPEG?w=346&h=499",
    },
  ],
];
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
