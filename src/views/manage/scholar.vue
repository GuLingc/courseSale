<template>
  <div class="scholars">
    <div class="condations">
      <el-input
        v-model="lecturerCondation"
        class="w-50 m-2"
        placeholder="请输入检索条件"
        :prefix-icon="Search"
      />
      <el-button
        type="primary"
        @click="selectLecturerAll(1, 5, lecturerCondation)"
        >搜索</el-button
      >
      <el-button type="success" @click="selectLecturerAll(1, 5, '')"
        >重置</el-button
      >
      <el-button type="warning" @click="addTeacher = true">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%; margin-top: 50px">
      <el-table-column type="index" label="序号" width="100px" align="center" />
      <el-table-column prop="lecturerName" label="姓名" align="center" />
      <el-table-column
        prop="lecturerIntroduction"
        label="简介"
        align="center"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button @click="handleLookLecturer(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleLecturer(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPages"
      v-model:page-size="pageSizes"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
      @change="handleChange"
    />
    <!-- 添加讲师 -->
    <el-dialog
      v-model="addTeacher"
      title="添加讲师"
      width="500px"
      :before-close="shutAdd"
    >
      <el-form>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="insertInfo.lecturerName" />
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input v-model="insertInfo.lecturerIntroduction" type="textarea" />
        </el-form-item>
        <el-form-item label="照片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-exceed="exceedFun"
            accept="image/*"
            v-model:file-list="photos"
          >
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="subminInfo">添加</el-button>
          <el-button @click="shutAdd">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 删除讲师 -->
    <el-dialog v-model="deleteLectureModel" title="提示信息" width="400px">
      <span>确定要删除这个讲师？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="shutSure">确定</el-button>
          <el-button @click="deleteLectureModel = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
    <!--查看讲师 -->
    <el-dialog
      v-model="lookLecturerModel"
      title="讲师信息"
      width="500px"
      :before-close="shutLookNews"
    >
      <el-form :model="lookInfo">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="lookInfo.lecturerName" />
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input
            v-model="lookInfo.lecturerIntroduction"
            :autosize="{ minRows: 1, maxRows: 5 }"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="原头像" :label-width="formLabelWidth">
          <ul class="photos" v-if="lookInfo.lecturerPicture != null">
            <li>
              <img :src="lookInfo.lecturerPicture" />
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="新头像" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-exceed="exceedFun"
            accept="image/*"
            v-model:file-list="newHeader"
          >
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="newsHeaderRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="editInfo">修改</el-button>
          <el-button @click="shutLookNews">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search, Plus, Delete } from "@element-plus/icons-vue";
import { ElMessage, type UploadFile, type UploadUserFile } from "element-plus";
import {
  insertLecturer,
  selectLecturerByPage,
  deleteLecturer,
  updateLecturer,
} from "@/api/manage";

let lecturerCondation = ref("");
let currentPages = ref(1);
let pageSizes = ref(5);
let totals = ref(0);
let newHeader = ref<any[]>([]);
let addTeacher = ref(false);
const disabled = ref(false);
let deleteLectureModel = ref(false);
let lookLecturerModel = ref(false);
let formLabelWidth = "80px";
interface typeInfo {
  lecturerId: number;
  lecturerName: string;
  lecturerIntroduction: string;
  lecturerPicture: string;
}
let tableData = ref<Array<typeInfo>>([]);
let lookInfo = ref<typeInfo>({
  lecturerId: 0,
  lecturerName: "",
  lecturerIntroduction: "",
  lecturerPicture: "",
});
let photos = ref<any[]>([]);
let deleteLecturerId = ref(0);
let insertInfo = ref({
  lecturerIntroduction: "",
  lecturerName: "",
});
onMounted(() => {
  selectLecturerAll(1, 5, "");
});
//分页搜索讲师
const selectLecturerAll = (
  pageNo: number,
  pageSize: number,
  search: string
) => {
  let data = {
    pageNo,
    pageSize,
    search,
  };
  selectLecturerByPage(data)
    .then((res) => {
      tableData.value = res.data.records;
      totals.value = res.data.total;
      lecturerCondation.value = search;
      currentPages.value = pageNo;
      pageSizes.value = pageSize;
    })
    .catch((error) => {
      ElMessage.error("查询数据失败");
    });
};
const handleChange = (current: number, size: number) => {
  selectLecturerAll(current, size, lecturerCondation.value);
};
//查看讲师信息
const handleLookLecturer = (row: any) => {
  lookInfo.value = row;
  lookLecturerModel.value = true;
};
//删除讲师弹窗
const handleLecturer = (row: any) => {
  deleteLecturerId.value = row.lecturerId;
  deleteLectureModel.value = true;
};
//删除讲师
const shutSure = () => {
  let data = {
    lecturerId: deleteLecturerId.value,
  };
  deleteLecturer(data)
    .then((res: any) => {
      if (res.code == 20000) {
        let index = tableData.value.findIndex((item) => {
          if (item.lecturerId == deleteLecturerId.value) {
            return true;
          }
        });
        tableData.value.splice(index, 1);
        totals.value = totals.value - 1;
        ElMessage.success("删除成功");
      } else {
        ElMessage.error("删除失败");
      }
    })
    .catch((error) => {
      ElMessage.error("删除失败");
    });
  deleteLectureModel.value = false;
};
//超出文件数量的钩子
const exceedFun = (files: File[], uploadFiles: UploadUserFile[]) => {
  ElMessage.warning("只允许上传一张照片");
};
//删除上传的头像
const handleRemove = (file: UploadFile) => {
  photos.value = [];
};
//添加讲师
const subminInfo = () => {
  let formdata = new FormData();
  formdata.append("file", photos.value[0].raw);
  let obj = {
    lecturerIntroduction: insertInfo.value.lecturerIntroduction,
    lecturerName: insertInfo.value.lecturerName,
  };
  insertLecturer(obj, formdata)
    .then((res: any) => {
      if (res.code == 20000) {
        ElMessage.success("添加成功");
      } else {
        ElMessage.error("添加失败");
      }
      selectLecturerAll(1, 5, lecturerCondation.value);
      addTeacher.value = false;
      insertInfo.value.lecturerIntroduction = "";
      insertInfo.value.lecturerName = "";
      photos.value = [];
    })
    .catch((error) => {
      ElMessage.error("添加失败");
    });
};
//关闭添加弹窗
const shutAdd = () => {
  addTeacher.value = false;
  insertInfo.value.lecturerIntroduction = "";
  insertInfo.value.lecturerName = "";
  photos.value = [];
};

//修改讲师信息
//删除新的上传头像
//删除上传的头像
const newsHeaderRemove = (file: UploadFile) => {
  newHeader.value = [];
};
//修改讲师信息
const editInfo = () => {
  let formdata = new FormData();
  let obj = {
    lecturerId: lookInfo.value.lecturerId,
    lecturerIntroduction: lookInfo.value.lecturerIntroduction,
    lecturerName: lookInfo.value.lecturerName,
  };
  if(newHeader.value.length!=0) {
    formdata.append("file", newHeader.value[0].raw);
  }
  updateLecturer(obj, formdata)
    .then((res: any) => {
      if (res.code == 20000) {
        ElMessage.success("修改成功");
        selectLecturerAll(
          currentPages.value,
          pageSizes.value,
          lecturerCondation.value
        );
        lookLecturerModel.value = false;
        newHeader.value = [];
      } else {
        ElMessage.error("修改失败");
      }
    })
    .catch((error) => {
      ElMessage.error("修改失败");
    });
};
//关闭修改弹窗
const shutLookNews = () => {
  selectLecturerAll(
    currentPages.value,
    pageSizes.value,
    lecturerCondation.value
  );
  lookLecturerModel.value = false;
  newHeader.value = [];
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
:deep(.el-table td.el-table__cell div) {
  white-space: nowrap;
}
.photos {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  li {
    max-width: 320px;
    max-height: 320px;
    overflow: hidden;
    img {
      width: 100%;
      max-height: 320px;
      object-fit: cover;
    }
  }
}
</style>
