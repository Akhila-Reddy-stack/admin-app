import http from './httpService';
import { apiUrl } from "../config.json";

// Get Inventry
export const InventryDetails = () => {
  const apiEndPoint = `${apiUrl}/inventryList`;
  console.log(apiEndPoint)
  return http.get(`${apiEndPoint}`);
}

//  Add Inventry
export function addInventry(data) {
  const apiEndPoint = `${apiUrl}/inventryList`;
  return http.post(`${apiEndPoint}`, data);
}

// edit Inventry
export function updateInventry(data) {
  console.log(";;;;;;;;;;; banner dta", data)
  const apiEndPoint = `${apiUrl}/inventryList?Itemnumber=${data.Itemnumber}`;
  console.log(apiEndPoint)
  return http.put(`${apiEndPoint}`, data);
}
 
// delete Inventry
export function deleteInventry(Itemnumber) {
  const apiEndPoint = `${apiUrl}/inventryList?Itemnumber=${Itemnumber}`;
  return http.delete(`${apiEndPoint}`);
}



