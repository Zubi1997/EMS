

import axiosInstance from './axiosInstance';
import { Routes } from './routes';
export const API = {
  login: body => axiosInstance.post(Routes.Login, body),
  editSale:(body:any,saleId:string) =>axiosInstance.put(`${Routes.editSale}/${saleId}`,body),
  getUserDetail: (userId:string) =>
    axiosInstance.get(
      `${Routes.userDetail}/${userId}`,
    ),
  
};
 