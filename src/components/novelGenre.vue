<template>
  <div class="novelGenre">
    <ul>
      <li class="genreTitle">小说分类</li>
      <li
        v-for="(item, index) in types"
        :key="item"
        :class="{ active: activeType === index }"
        @click="selectType(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const types = ["全部", "文学", "历史", "艺术审美", "语言", "诗歌"];
const activeType = ref(0);
const selectType = (index: number) => {
  activeType.value = index;
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  li {
    line-height: 50px;
    padding-left: 20px;
    cursor: pointer;
    border-bottom: 1px #d7d5d5 dashed;
    transition: all 0.7s;
  }
  .genreTitle {
    color: white;
    font-size: 18px;
    pointer-events: none;
    background-color: rgb(179, 106, 231);
  }
  .active {
    background-color: rgba(192, 121, 243, 0.735);
    color: white;
  }
  li:hover {
    background-color: rgba(192, 121, 243, 0.735);
    color: white;
  }
}
</style>
