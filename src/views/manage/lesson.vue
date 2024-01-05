<template>
  <div class="lessons">
    <div class="condations">
      <el-input
        v-model="courseCondation"
        class="w-50 m-2"
        placeholder="请输入检索条件"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="gainCoursers(1, 10, courseCondation)"
        >搜索</el-button
      >
      <el-button type="success" @click="gainCoursers(1, 10, '')"
        >重置</el-button
      >
      <el-button type="info" @click="addCourseModel = true">添加</el-button>
      <el-button type="warning" @click="manageType = true">类型</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%; margin-top: 50px">
      <el-table-column prop="courseTime" label="创建时间" align="center" />
      <el-table-column prop="courseTitle" label="课程名称" align="center" />
      <el-table-column prop="lecturerName" label="讲师" align="center" />
      <el-table-column
        prop="courseIntroduction"
        label="课程简介"
        align="center"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button @click="lookOpen(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteOpen(scope.row)"
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
    <!-- 课程相关 -->
    <el-dialog
      v-model="addCourseModel"
      title="添加课程"
      width="500px"
      :before-close="shutAdd"
    >
      <el-form>
        <el-form-item label="课程名" :label-width="formLabelWidth">
          <el-input v-model="insertInfo.courseTitle" />
        </el-form-item>
        <el-form-item label="课程讲师" :label-width="formLabelWidth">
          <el-select v-model="insertInfo.lecturerId" placeholder="请选择讲师">
            <el-option
              v-for="item in teachers"
              :key="item.lecturerId"
              :label="item.lecturerName"
              :value="item.lecturerId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程标签" :label-width="formLabelWidth">
          <el-select v-model="firstTypeId" placeholder="选择课程标签">
            <el-option
              v-for="(item, index) in typeDatas"
              :key="index"
              :label="item.typeName"
              :value="item.typeId"
            />
          </el-select>
          <el-select v-model="courseTypeId" placeholder="选择二级标签">
            <el-option
              v-for="(item, index) in secondDatas"
              :key="index"
              :label="item.typeName"
              :value="item.typeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程简介" :label-width="formLabelWidth">
          <el-input v-model="insertInfo.courseIntroduction" type="textarea" />
        </el-form-item>
        <el-form-item label="课程封面" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-exceed="exceedFun"
            accept="image/*"
            v-model:file-list="coursePicture"
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
        <el-form-item label="课程视频" :label-width="formLabelWidth">
          <el-upload
            action="#"
            :limit="1"
            :auto-upload="false"
            :on-exceed="exceedFun"
            accept="mp4、mov、avi、mkv、flv"
            v-model:file-list="courseVideo"
          >
            <template #trigger>
              <el-button type="primary">上传视频</el-button>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="subminCourse">添加</el-button>
          <el-button @click="shutAdd">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="deleteConfrom" title="提示信息" width="400px">
      <span>确定要删除此课程？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="deleteSure">确定</el-button>
          <el-button @click="deleteConfrom = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="lookCourseModel" title="课程信息" width="440px">
      <el-form :model="courseInfo">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input :value="courseInfo.courseTitle" :disabled="true" />
        </el-form-item>
        <el-form-item label="课程简介" :label-width="formLabelWidth">
          <el-input :value="courseInfo.courseIntroduction" :disabled="true" />
        </el-form-item>
        <el-form-item label="课程讲师" :label-width="formLabelWidth">
          <el-input :value="courseInfo.lecturerName" :disabled="true" />
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input :value="courseInfo.courseTime" :disabled="true" />
        </el-form-item>
        <el-form-item label="访问量" :label-width="formLabelWidth">
          <el-input :value="courseInfo.courseNum" :disabled="true" />
        </el-form-item>
        <el-form-item label="课程封面" :label-width="formLabelWidth">
          <ul class="photos">
            <li>
              <img :src="courseInfo.coursePicture" />
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="lookCourseModel = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
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
          <el-button
            type="primary"
            @click="handleInputConfirm(0, firstContent, 0)"
            >添加</el-button
          >
          <el-button @click="shutClose"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus, Delete } from "@element-plus/icons-vue";
import { ElMessage, type UploadFile, type UploadUserFile } from "element-plus";
import { onMounted, ref, watch } from "vue";
import {
  insertType,
  selectAll,
  deleteType,
  selectByType,
  insertCourse,
  insertCourseType,
  selectLecturerByPage,
  viewByPage,
  deleteCourse,
} from "@/api/manage";
let courseCondation = ref("");
let currentPages = ref(1);
let pageSizes = ref(10);
let totals = ref(0);
let deleteCourseId = ref(0);
let courseInfo = ref({
  courseId: 0,
  lecturerId: 0,
  lecturerName: "",
  courseTitle: "",
  courseIntroduction: "",
  coursePicture: "",
  courseVideo: "",
  courseTime: "0000-00-00 00:00:00",
  courseNum: 0,
});
let addCourseModel = ref(false);
const disabled = ref(false);
let deleteConfrom = ref(false);
let lookCourseModel = ref(false);
interface teachersType {
  lecturerId: number;
  lecturerIntroduction: string;
  lecturerName: string;
  lecturerPicture: string;
}
let teachers = ref<Array<teachersType>>([]);
let coursePicture = ref<any[]>([]);
let firstTypeId = ref("");
let courseVideo = ref<any[]>([]);
let courseTypeId = ref("");
let insertInfo = ref({
  courseIntroduction: "",
  courseTitle: "",
  lecturerId: "",
});

//类型
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
let formLabelWidth = "80px";
let tableData = ref<any[]>([]);
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
  selectLecturerAll(1, 1000, "");
  gainCoursers(1, 10, "");
});

//课程-------------------------------------
//分页搜索课程
const gainCoursers = (pageNo: number, pageSize: number, search: string) => {
  let data = {
    pageNo,
    pageSize,
    search,
  };
  viewByPage(data)
    .then((res) => {
      tableData.value = res.data.records;
      totals.value = res.data.total;
      (currentPages.value = pageNo),
        (pageSizes.value = pageSize),
        (courseCondation.value = search);
    })
    .catch((error) => {
      ElMessage.error("查询课程失败");
    });
};
const handleChange = (current: number, size: number) => {
  gainCoursers(current, size, courseCondation.value);
};
//获取所有讲师
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
      teachers.value = res.data.records;
    })
    .catch((error) => {
      ElMessage.error("查询所有老师失败");
    });
};
//关闭添加弹窗
const shutAdd = () => {
  addCourseModel.value = false;
  firstTypeId.value = "";
  insertInfo.value.courseIntroduction = "";
  insertInfo.value.courseTitle = "";
  insertInfo.value.lecturerId = "";
  coursePicture.value = [];
  courseVideo.value = [];
};
//添加课程
const subminCourse = () => {
  let formdata = new FormData();
  formdata.append("picture", coursePicture.value[0].raw);
  formdata.append("video", courseVideo.value[0].raw);
  let data = {
    courseIntroduction: insertInfo.value.courseIntroduction,
    courseTitle: insertInfo.value.courseTitle,
    lecturerId: insertInfo.value.lecturerId,
  };
  insertCourse(data, formdata)
    .then((res: any) => {
      console.log("添加课程", res);
      if (res.code == 20000) {
        gainCoursers(1, 10, "");
        ElMessage.success("添加成功");
      } else {
        ElMessage.error("添加失败");
      }
      addCourseModel.value = false;
      firstTypeId.value = "";
      insertInfo.value.courseIntroduction = "";
      insertInfo.value.courseTitle = "";
      insertInfo.value.lecturerId = "";
      coursePicture.value = [];
      courseVideo.value = [];
    })
    .catch((error) => {
      ElMessage.error("添加失败");
    });
};
//超出文件数量的钩子
const exceedFun = (files: File[], uploadFiles: UploadUserFile[]) => {
  ElMessage.warning("只允许上传一个文件");
};
//删除上传的封面
const handleRemove = (file: UploadFile) => {
  coursePicture.value = [];
};
//删除课程弹窗
const deleteOpen = (row: any) => {
  deleteCourseId.value = row.courseId;
  deleteConfrom.value = true;
};
//删除课程
const deleteSure = () => {
  let data = {
    courseId: deleteCourseId.value,
  };
  deleteCourse(data)
    .then((res: any) => {
      if (res.code == 20000) {
        gainCoursers(
          currentPages.value,
          pageSizes.value,
          courseCondation.value
        );
        ElMessage.success("删除成功");
      } else {
        ElMessage.error("删除失败");
      }
    })
    .catch((error) => {
      ElMessage.error("删除失败");
    });
  deleteConfrom.value = false;
};
//编辑课程的弹窗
const lookOpen = (row: any) => {
  courseInfo.value = row;
  lookCourseModel.value = true;
};

//类型----------------------------------
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
        if (typeLevel == 0) {
          gainTypes();
          addTypeModel.value = false;
        } else {
          goldSecond();
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
  inputType.value = "";
  inputVisible.value = true;
};
//重新获取二级类型
const goldSecond = () => {
  let data = {
    typeId: fatherId.value,
  };
  selectByType(data)
    .then((res) => {
      secondDatas.value = res.data;
    })
    .catch((error) => {
      ElMessage.error("更新类型失败");
    });
};
//关闭一级弹窗
const shutClose = () => {
  firstContent.value = "";
  addTypeModel.value = false;
};

watch(firstTypeId, (newValue, oldValue) => {
  secondDatas.value = [];
  courseTypeId.value = "";
  if (firstTypeId.value) {
    let data = {
      typeId: newValue,
    };
    selectByType(data)
      .then((res) => {
        secondDatas.value = res.data;
      })
      .catch((error) => {
        ElMessage.error("获取类型失败");
      });
  }
});
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
.el-select {
  width: 300px;
  margin-bottom: 10px;
}
.el-input {
  width: 300px;
  margin-bottom: 10px;
}
.el-button {
  margin-bottom: 10px;
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
