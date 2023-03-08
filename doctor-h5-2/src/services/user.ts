import request from '@/utils/request'

export const loginAPI = (mobile: string, password: string) => {
  return request({
    url: '/login/password',
    method: 'post',
    data: { mobile, password }
  })
}

export const sendCodeAPI = (mobile: string, type = "login") => {
  return request({
    url: "/code",
    params: { mobile, type },
  });
};

export const loginByCodeAPI = (mobile: string, code: string) => {
  return request({
    url: "/login",
    method: "post",
    data: { mobile, code },
  });
};

export const getUserInfoAPI = () => {
  return request({
    url: "/patient/myUser",
  });
};