<template>
  <div class="users" v-loading="loading">
    <div class="condations">
      <el-input
        v-model="userCondation"
        class="w-50 m-2"
        placeholder="请输入检索条件"
        :prefix-icon="Search"
      />
      <el-button type="primary">搜索</el-button>
      <el-button type="success" @click="selectUser(1, 10)">重置</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 50px; font-size: 16px"
    >
      <el-table-column prop="registerTime" label="注册时间" />
      <el-table-column prop="account" label="账户" />
      <el-table-column prop="username" label="昵称" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)">查看</el-button>
          <el-button @click="handleShut(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPages"
      v-model:page-size="pagesSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @change="handleChange"
    />
    <el-dialog v-model="userInfoShow" title="用户信息">
      <el-form>
        <el-form-item label="账户" :label-width="formLabelWidth">
          <el-input v-bind:value="signleInfo.account" disabled />
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-bind:value="signleInfo.username" disabled />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-bind:value="signleInfo.sex" disabled />
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-input v-bind:value="signleInfo.birthday" disabled />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-bind:value="signleInfo.email" disabled />
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-bind:value="signleInfo.phone" disabled />
        </el-form-item>
        <el-form-item label="注册时间" :label-width="formLabelWidth">
          <el-input v-bind:value="signleInfo.registerTime" disabled />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userInfoShow = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="deleteConfrom" title="提示信息" width="400px">
      <span>确定要删除此用户？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="shutSure">确定</el-button>
          <el-button @click="deleteConfrom = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { selectUsers, information } from "@/api/manage";
import { ElMessage } from "element-plus";
let loading = ref(false);
let userInfoShow = ref(false);
let deleteConfrom = ref(false);
let currentPages = ref(1);
let pagesSize = ref(10);
let userCondation = ref("");
let total = ref(0);
let deleteUserId = ref(0);
let tableData = ref([]);
let signleInfo = ref({
  userId: 0,
  account: "",
  username: "课堂外星人",
  userPassword: "",
  email: "",
  registerTime: "0000-00-00",
  userPicture:
    "https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/%E5%AE%9E%E8%AE%AD/post/15.webp",
  sex: "男",
  birthday: "0000-00-00",
  phone: "未设置",
  introduction: "该用户还未对自己进行介绍哦~",
  authority: 0,
});
let formLabelWidth = "90px";
onMounted(() => {
  selectUser(1, 10);
});
function selectUser(aidPage: number, aidSize: number, selectContent?: string) {
  loading.value = true;
  let data = {
    pageNo: aidPage,
    pageSize: aidSize,
    search: selectContent || "",
  };
  selectUsers(data)
    .then((response) => {
      console.log(response);
      currentPages.value = aidPage;
      pagesSize.value = aidSize;
      userCondation.value = selectContent || "";
      total.value = response.data.total;
      tableData.value = response.data.records;
      loading.value = false;
    })
    .catch((err) => {
      ElMessage.error("查询失败");
      loading.value = false;
    });
}
const handleChange = (current: number, size: number) => {
  selectUser(current, size, userCondation.value);
};
const handleEdit = (row: any) => {
  let data = {
    userId: row.userId,
  };
  information(data)
    .then((res) => {
      signleInfo.value = res.data;
      userInfoShow.value = true;
    })
    .catch((error) => {
      ElMessage.error("获取用户信息失败");
    });
};
const handleShut = (row: any) => {
  deleteUserId.value = row.userId;
  deleteConfrom.value = true;
};
const shutSure = () => {
  deleteConfrom.value = false;
};
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
:deep(.el-dialog) {
  width: 500px;
  font-size: 18px;
  label {
    font-size: 16px;
  }
  .el-input.is-disabled .el-input__wrapper {
    background-color: white;
    font-size: 16px;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
}
</style>
