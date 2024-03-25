import React from "react";
const UserContext = React.createContext({ email: "", auth: false });
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: "", auth: false });
  const [testname, setTestname] = React.useState('');
  const [listIdTest, setListIdTest] =React.useState([
    { id: "TDH202024", name: "Toán Lớp 3" },
    { id: "TDH202023", name: "Lý Lớp 7" },
    { id: "TDH202022", name: "Hóa Lớp 11" },
    { id: "TDH202021", name: "Địa Lớp 12" },
  ]);
  const showMarkTest = (name)=>{
    setTestname(name);
  }
  const login = (email) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
  };
  const logout = () => {
    setUser((user) => ({
      email: "",
      auth: false,
    }));
    localStorage.removeItem("email");
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
  };
  return (
    <>
      <UserContext.Provider value={{ user, testname, login, logout, listIdTest, showMarkTest}}>
        {children}
      </UserContext.Provider>
    </>
  );
};
export { UserContext, UserProvider };
