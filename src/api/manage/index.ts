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
export const deleteType = async (data:any) =>
requests({
  url: "/type/deleteType",
  method: "DELETE",
  params:data
});

