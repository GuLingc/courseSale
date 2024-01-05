import requests from "../request";

//分页查询用户
export const selectUsers = async (data: any) =>
  requests({
    url: "/user/viewByPage",
    method: "GET",
    params: data,
  });
//查看某个用户的信息
export const information = async (data: any) =>
  requests({
    url: "/user/information",
    method: "GET",
    params: data,
  });
//删除用户
export const deleteUser = async (data: any) =>
  requests({
    url: "/user/delete",
    method: "DELETE",
    params: data,
  });

//插入类型
export const insertType = async (data: any) =>
  requests({
    url: "/type/insertType",
    method: "POST",
    params: data,
  });
//获取类型
export const selectAll = async () =>
  requests({
    url: "/type/selectAll",
    method: "GET",
  });
//删除类型
export const deleteType = async (data: any) =>
  requests({
    url: "/type/deleteType",
    method: "DELETE",
    params: data,
  });
//查看一级类型下的二级类型
export const selectByType = async (data: any) =>
  requests({
    url: "/type/selectByType",
    method: "GET",
    params: data,
  });

//添加老师
export const insertLecturer = async (params: any, data: any) =>
  requests({
    url: "/lecturer/insertLecturer",
    method: "POST",
    params,
    data,
  });
//分页搜索讲师
export const selectLecturerByPage = async (data: any) =>
  requests({
    url: "/lecturer/selectLecturerByPage",
    method: "GET",
    params: data,
  });
//删除讲师
export const deleteLecturer = async (data: any) =>
  requests({
    url: "/lecturer/deleteLecturer",
    method: "DELETE",
    params: data,
  });
//修改讲师信息
export const updateLecturer = async (params: any, data: any) =>
  requests({
    url: "/lecturer/updateLecturer",
    method: "PUT",
    params,
    data,
  });

//添加课程
export const insertCourse = async (params: any, data: any) =>
  requests({
    url: "/course/insertCourse",
    method: "POST",
    params,
    data,
  });
//添加课程类型
export const insertCourseType = async (data: any) =>
  requests({
    url: "/type/insertCourseType",
    method: "POST",
    params: data,
  });
//分页搜索课程
export const viewByPage = async (data: any) =>
  requests({
    url: "/course/viewByPage",
    method: "GET",
    params: data,
  });
//删除课程
export const deleteCourse = async (data: any) =>
  requests({
    url: "/course/deleteCourse",
    method: "DELETE",
    params: data,
  });
//修改课程信息
export const updateCourse = async (data: any) =>
  requests({
    url: "/course/updateCourse",
    method: "PUT",
    params:data
  });