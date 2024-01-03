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
let status = "不限";
let labels = [
  {
    typeId: 1,
    typeName: "测试",
    typeChildren: [
      {
        typeId: 2,
        typeName: "测试2",
        typeChildren: null,
      },
      {
        typeId: 3,
        typeName: "测试3",
        typeChildren: null,
      },
    ],
  },
  {
    typeId: 4,
    typeName: "测试4",
    typeChildren: [],
  },
];
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
