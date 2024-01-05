<template>
  <div class="labels">
    <ul>
      <li v-for="(item, index) in labels" :key="index">
        <div class="active">{{ item.typeName }}</div>
        <div>全部</div>
        <div
          v-for="(child, o) in item.typeChildren"
          :key="o"
          :class="{ active: status === child.typeName }"
        >
          {{ child.typeName }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { selectAll } from "@/api/manage";
import { ElMessage } from "element-plus";
let status = "不限";
let labels = ref<any[]>([]);
onMounted(() => {
  gainTypes();
});
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
</script>

<style lang="scss" scoped>
.labels {
  color: white;
  li {
    display: flex;
    div {
      margin-left: 20px;
    }
    .active {
      color: rgb(217 185 255);
    }
  }
}
</style>
