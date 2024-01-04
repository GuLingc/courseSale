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
      <el-button type="warning" @click="manageType = true">类型</el-button>
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
    <!-- 管理类型 -->
    <el-dialog v-model="manageType" title="类型管理" width="540px">
      <div>
        <el-button type="primary" @click="addTypeModel = true"
          >添加类型</el-button
        >
      </div>
      <el-table
        :data="typeDatas"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        :style="inputcss"
      >
        <el-table-column type="index" label="序号" width="60px" />
        <el-table-column property="typeName" label="类型名称" width="200px" />
        <el-table-column #default="scope" label="操作">
          <el-button @click="changeSecond(scope.row)">管理</el-button>
          <el-button type="danger" @click="handleFirstClose(scope.row.typeId)"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="manageType = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="secondType" title="类型管理" width="540px">
      <el-tag
        v-for="item in secondDatas"
        :key="item.typeId"
        class="mx-1"
        closable
        :type="getRandomTagType()as'success' | 'info' | 'warning' | 'danger' | ''"
        @close="handleClose(item.typeId)"
      >
        {{ item.typeName }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        v-model="inputType"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm(1, inputType, fatherId)"
      />
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="showInput"
      >
        + 添加标签
      </el-button>
    </el-dialog>
    <el-dialog
      v-model="addTypeModel"
      title="添加类型"
      width="350px"
      :before-close="shutClose"
    >
      类型名称：<el-input
        v-model="firstContent"
        placeholder="请输入类型名称"
        clearable
        :style="inputcss"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleInputConfirm(0,firstContent,0)">添加</el-button>
          <el-button @click="shutClose"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { insertType, selectAll, deleteType } from "@/api/manage";
let userCondation = ref("");
let currentPage = ref(1);
let pageSize = ref(10);
let inputType = ref("");
let firstContent = ref("");
let fatherId = ref(0);
let manageType = ref(false);
let secondType = ref(false);
let inputVisible = ref(false);
let addTypeModel = ref(false);
let inputcss = {
  marginTop: "10px",
};
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
interface typeInfo {
  typeChildren: any;
  typeId: number;
  typeName: string;
}
let typeDatas = ref<Array<typeInfo>>([]);
let secondDatas = ref<Array<typeInfo>>([]);
const tagTypes = ["success", "info", "warning", "danger", ""];
onMounted(() => {
  gainTypes();
});
function getRandomTagType() {
  return tagTypes[Math.floor(Math.random() * tagTypes.length)] as
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "";
}
//获取类型
const gainTypes = () => {
  selectAll()
    .then((res) => {
      console.log("获取全部类型", res);
      typeDatas.value = res.data;
    })
    .catch((error) => {
      ElMessage.error("获取类型失败");
    });
};
//获取二级类型
const changeSecond = (row: any) => {
  secondDatas.value = row.typeChildren;
  fatherId.value = row.typeId;
  secondType.value = true;
};
//删除类型
const handleClose = (typeId: number) => {
  let data = {
    typeId,
  };
  deleteType(data)
    .then((res) => {
      let index = secondDatas.value.findIndex((item) => {
        if (item.typeId == typeId) {
          return true;
        }
      });
      secondDatas.value.splice(index, 1);
      ElMessage.success("删除成功");
    })
    .catch((error) => {
      ElMessage.error("删除失败");
    });
};
const handleFirstClose = (typeId: number) => {
  let data = {
    typeId,
  };
  deleteType(data)
    .then((res) => {
      let index = typeDatas.value.findIndex((item) => {
        if (item.typeId == typeId) {
          return true;
        }
      });
      typeDatas.value.splice(index, 1);
      console.log(1111111);
      
      ElMessage.success("删除成功");
    })
    .catch((error) => {
      ElMessage.error("删除失败");
    });
};
//添加类型
const handleInputConfirm = (
  typeLevel: number,
  typeName: string,
  typeFather: number
) => {
  //trim()去除两端空格
  if (typeName.trim()) {
    let data = {
      typeFather,
      typeLevel,
      typeName,
    };
    insertType(data)
      .then((res) => {
        console.log("添加成功", res);
        ElMessage.success("添加成功");
        if(typeLevel == 0){
          gainTypes();
          addTypeModel.value = false
        }else{
          inputVisible.value = false;
        }
      })
      .catch((error) => {
        ElMessage.error("添加失败");
      });
  } else {
    ElMessage.warning("输入内容不能为空");
  }
};
const showInput = () => {
  inputVisible.value = true;
};
//关闭一级弹窗
const shutClose = () => {
  firstContent.value = "";
  addTypeModel.value = false;
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
</style>
