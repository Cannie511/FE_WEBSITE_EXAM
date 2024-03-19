import axios from "axios";
const apiLogin = (username, password) => {
  let res = axios.post("https://reqres.in/api/login", { username, password });
  return res;
};
export { apiLogin };
