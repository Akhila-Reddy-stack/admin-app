import http from './httpService';
import { apiUrl } from "../config.json";

export const getCategoryList = (params) => {
  const apiEndPoint = `${apiUrl}/listCategories?${params}`;
  return http.get(apiEndPoint);
}

export const getCategorybyId = (params) => {    
  const apiEndPoint = `${apiUrl}/listCategories?${params}`;
  return http.get(apiEndPoint);
}

export const getToptenValues = () => {
  const apiEndPoint = `${apiUrl}/topTenSellers`;
  return http.get(apiEndPoint)
}

export const getDeliveryDetails = () => {
  const apiEndPoint = `${apiUrl}/deliverycount`;
  return http.get(apiEndPoint)
}

export const getPendingList = () => {
  const apiEndPoint = `${apiUrl}/pendingList`;
  return http.get(apiEndPoint)
}

export const getProductsbyId = (params) => {    
  const apiEndPoint = `${apiUrl}/particularProduct?${params}`;
  return http.get(apiEndPoint);
}


export const gettotalNumberOfUsers = () => {
  const apiEndPoint = `${apiUrl}/totalUsers`;
  return http.get(apiEndPoint)
}

export const getNumberOfTransactions = () => {
  const apiEndPoint = `${apiUrl}/todayTransactionCount`;
  return http.get(apiEndPoint)
}

export const gettransaction = () => {
  const apiEndPoint = `${apiUrl}/transaction`;
  return http.get(apiEndPoint)
}

export const getuserDetails = () => {
  const apiEndPoint = `${apiUrl}/userDetails`;
  return http.get(apiEndPoint)
}



