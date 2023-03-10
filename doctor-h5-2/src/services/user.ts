import type { Knowledge } from '@/types/consult';
import type { AddPatient } from '@/types/user';
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

/** 获取患者列表 */
export const getPatientListAPI = () => {
  return request({ url: "/patient/mylist" });
};

export const addPatientAPI = (data: AddPatient) => {
  return request({ url: 'patient/add', method: 'post', data})
}

export const editPatientAPI = (data: AddPatient) => {
  return request({ url: 'patient/update', method: 'put', data})
}

export const delPatientByIdAPI = (id: string) => {
  return request({ url: `patient/del/${id}`, method: 'delete'})
}

