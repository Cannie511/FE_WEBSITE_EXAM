import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api";
const apiLogin = async (email, password) => {
  let res = await axios.post(`${API_URL}/login`, { email, password });
  return res;
};
const apiRegister = async (name, email, password) => {
  let res = await axios.post(`${API_URL}/register`, { name, email, password });
  return res;
};
const apiGetAllExamForStu = async () => {
  let res = await axios.get(`${API_URL}/danh-sach-de-thi-public`);
  return res;
};
const apiGetDetailExamForStu = async (id) => {
  let res = await axios.get(`${API_URL}/lam-bai/${id}`);
  return res;
};
const apiGetKeyExam = async (id) => {
  let res = await axios.get(`${API_URL}/dap-an-dung/${id}`);
  return res;
};
const apiSaveMark = async (socaudung, sodiem, dethi, user) => {
  let res = await axios.post(`${API_URL}/nop-bai`, {
    socaudung: socaudung,
    sodiem: sodiem,
    dethi_id: dethi,
    user_id: user,
  });
  return res;
};
const apiGetExamOfTeacher = async (id) => {
  let res = await axios.get(`${API_URL}/danh-sach-de-thi-giao-vien/${id}`);
  return res;
};
const apiAddPublicExam = async (
  tendethi,
  thoigianthi,
  soluongcauhoi,
  user_id,
  monhoc_id,
  cauhoi
) => {
  let res = await axios.post(`${API_URL}/them-de-thi`, {
    tendethi,
    thoigianthi,
    soluongcauhoi,
    user_id,
    monhoc_id,
    cauhoi,
  });
  return res;
};
const apiAddDraftExam = async (
  tendethi,
  thoigianthi,
  soluongcauhoi,
  user_id,
  monhoc_id,
  cauhoi
) => {
  let res = await axios.post(`${API_URL}/them-de-thi-nhap`, {
    tendethi,
    thoigianthi,
    soluongcauhoi,
    user_id,
    monhoc_id,
    cauhoi,
  });
  return res;
};
const apiDeleteDraftExam = async (userId, id) => {
  let res = await axios.delete(`${API_URL}/xoa-de-thi/${userId}/${id}`);
  return res;
};
const apiEditDraftExam = async (id, tendethi, thoigianthi, user_id)=>{
 let res = await axios.put(`${API_URL}/sua-de-thi/${id}`,{tendethi, thoigianthi, user_id})
 return res;
}
const apiDeleteQuestion= async(id, user_id)=>{
  let res = await axios.post(`${API_URL}/xoa-cau-hoi`, {id, user_id});
  return res;
}
const apiEditQuestion = async(user_id, noidung, dap_an_a, dap_an_b, dap_an_c, dap_an_d, dap_an_dung, id)=>{
   let res = await axios.put(`${API_URL}/sua-cau-hoi/${id}`,{user_id, noidung, dap_an_a, dap_an_b, dap_an_c, dap_an_d, dap_an_dung})
   return res;
}
const apiGetListMarkExam = async(idde, iduser)=>{
  let res = await axios.get(`${API_URL}/chi-tiet/${idde}/${iduser}`)
  return res;
}
const apiAddNewQuesToExam = async(noidung, dap_an_a, dap_an_b, dap_an_c, dap_an_d, dap_an_dung, dethi_id )=>{
  let res = await axios.post(`${API_URL}/them-cau-hoi`,{noidung, dap_an_a, dap_an_b, dap_an_c, dap_an_d, dap_an_dung, dethi_id });
  return res;
}
const apiPublicExam = async(id, user_id)=>{
  let res = await axios.put(`${API_URL}/chuyen-trang-thai/${id}`,{user_id});
  return res;
}
export {
  apiLogin,
  apiRegister,
  apiGetAllExamForStu,
  apiGetDetailExamForStu,
  apiGetKeyExam,
  apiSaveMark,
  apiGetExamOfTeacher,
  apiAddPublicExam,
  apiAddDraftExam,
  apiDeleteDraftExam,
  apiEditDraftExam,
  apiDeleteQuestion,
  apiEditQuestion,
  apiGetListMarkExam,
  apiAddNewQuesToExam,
  apiPublicExam
};
