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
//忘记密码
export const forgetPassword = async (data: any) =>
  requests({
    url: "/user/forgetPassword",
    method: "PUT",
    params: data,
  });

//查看用户信息
export const information = async (data: any) =>
  requests({
    url: "/user/information",
    method: "GET",
    params: data,
  });
//修改用户信息
export const updateSelf = async (data: any) =>
  requests({
    url: "/user/updateSelf",
    method: "PUT",
    params: data,
  });

//金牌讲师
export const hostLecturer = async () =>
  requests({
    url: "/lecturer/hostLecturer",
    method: "GET",
  });

//热门课程
export const viewByType = async (data: any) =>
  requests({
    url: "/course/viewByType",
    method: "GET",
    params: data,
  });
//通过id查看课程
export const viewById = async (data: any) =>
  requests({
    url: "/course/viewById",
    method: "GET",
    params: data,
  });
//查看老师的所有课程
export const viewByLecturer = async (data: any) =>
  requests({
    url: "/course/viewByLecturer",
    method: "GET",
    params: data,
  });
//增加浏览量
export const browse = async (data: any) =>
  requests({
    url: "/course/browse",
    method: "PUT",
    params: data,
  });
