import React from "react";
const UserContext = React.createContext({
  email: "",
  auth: false,
  name: "",
  id: "",
  role: "",
});
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    email: "",
    auth: false,
    name: "",
    id: "",
    role: "",
  });
  const [testname, setTestname] = React.useState("");
  const [listIdTest, setListIdTest] = React.useState([]);
  const [listQues, setListQues] = React.useState([
    {
      id: 1,
      title: "1+1 = ?",
      A: 1,
      B: 2,
      C: 3,
      D: 4,
    },
    {
      id: 2,
      title: "5 x 10 = ?",
      A: 10,
      B: 50,
      C: 5,
      D: 40,
    },
    {
      id: 3,
      title: "9 x 9 = ?",
      A: 81,
      B: 12,
      C: 35,
      D: 4,
    },
    {
      id: 4,
      title: "15 + 20 = ?",
      A: 15,
      B: 20,
      C: 35,
      D: 40,
    },
    {
      id: 5,
      title: "99 + 99 = ?",
      A: 197,
      B: 299,
      C: 189,
      D: 198,
    },
  ]);
  const showMarkTest = (name) => {
    setTestname(name);
  };
  const onLoadUser = () => {
    if (localStorage.getItem("token")) {
      setUser((user) => ({
        email: localStorage.getItem("email"),
        auth: true,
        name: localStorage.getItem("name"),
        id: localStorage.getItem("token"),
        role: +localStorage.getItem("role"),
      }));
    } else {
      setUser((user) => ({
        email: "",
        auth: false,
        name: "",
        id: "",
        role: "",
      }));
    }
  };
  const login = (email, name, id, role) => {
    setUser((user) => ({
      email: email,
      auth: true,
      name: name,
      id: id,
      role: role,
    }));
  };
  const logout = () => {
    setUser((user) => ({
      email: "",
      auth: false,
      name: "",
      id: "",
      role: "",
    }));
    localStorage.removeItem("email");
    localStorage.removeItem("login");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("listIdTest");
  };
  const setListTest = (list) =>{
    setListIdTest(list);
    // console.log("context: ", listIdTest);
  }
  return (
    <>
      <UserContext.Provider
        value={{
          user,
          testname,
          login,
          logout,
          listIdTest,
          listQues,
          showMarkTest,
          onLoadUser,
          setListTest
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
export { UserContext, UserProvider };
