<template>
  <div class="bookViews">
    <ul>
      <li v-for="item in 4" :key="item">
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>Yummy hamburger</span>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentDate = ref(new Date());
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 260px;
    align-items: center;
    margin-top: 20px;
    img {
      width: 100%;
      height: 220px;
    }
  }
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}
</style>
