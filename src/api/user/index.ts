import requests from "../request";
//发送验证码
export const sendEmail = async (data: any) =>
  requests({
    url: "/user/sendEmail",
    method: "POST",
    params: data,
  });

//用户登录
export const accountLogin = async (data: any) =>
  requests({
    url: "/user/accountLogin",
    method: "POST",
    params: data,
  });

//邮箱登录
export const emailLogin = async (data: any) =>
  requests({
    url: "/user/emailLogin",
    method: "POST",
    params: data,
  });

//用户注册
export const userRegister = async (data: any) =>
  requests({
    url: "/user/register",
    method: "POST",
    params: data,
  });

  //金牌讲师
export const hostLecturer = async () =>
  requests({
    url: "/lecturer/hostLecturer",
    method: "GET",
  });

  //热门课程
  export const viewByType = async (data:any) =>
  requests({
    url: "/course/viewByType",
    method: "GET",
    params:data
  });