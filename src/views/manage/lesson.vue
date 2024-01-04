<template>
  <div class="lessons">
    <div class="condations">
      <el-input
        v-model="userCondation"
        class="w-50 m-2"
        placeholder="请输入检索条件"
        :prefix-icon="Search"
      />
      <el-button type="primary">搜索</el-button>
      <el-button type="success">重置</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%; margin-top: 50px">
      <el-table-column prop="date" label="注册时间" />
      <el-table-column prop="name" label="账户" />
      <el-table-column prop="state" label="昵称" />
      <el-table-column prop="city" label="性别" />
      <el-table-column prop="address" label="邮箱" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
let userCondation = ref("");
let currentPage = ref(1)
let pageSize = ref(10)
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
];
</script>

<style lang="scss" scoped>
.condations {
  .el-input {
    width: 300px;
  }
}
.el-pagination {
  margin-top: 26px;
  .demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
  }
  .demo-pagination-block .demonstration {
    margin-bottom: 16px;
  }
}
</style>

