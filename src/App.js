import "./App.scss";
import Nav from "./Components/Nav/Nav";
import {
  BrowserRouter,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useEffect, useState } from "react";
import AppRoutes from "./Components/Routes/AppRoutes";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./Components/Context/UserContext";
import { apiGetAllExamForStu } from "./services/APIServices";
function App() {
  const { setListTest } = useContext(UserContext);
  const { onLoadUser } = useContext(UserContext);
  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSession, setIsSession] = useState(false);
  const [selectedAns, setSelectedAns] = useState({});
  const [listAns, setListAns] = useState([]);
  const [matchQues, setMatchQues] = useState(0);
  const [point, setPoint] = useState(0);
  const [role, setRole]=useState()
  const shuffled = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  const [listKey, setListKey] = useState([]);
  const [listQuesNoShuf, setListQuesNoShuf] = useState([]);
  const [listIdTest, setListIdTest] = useState([]);
  const [listQues, setListQues] = useState([]);
  const markPerQes = 10 / listQues.length;
  const handleGetAnswer = (answer) => {
    setSelectedAns(answer);
  };

  let countTrue = 0;
  const filterAndKeepLast = (arr) => {
    //Sử dụng đối tượng để theo dõi giá trị của mỗi ID
    const idMap = {};
    // Lặp qua mảng và cập nhật giá trị của mỗi ID trong đối tượng
    arr.forEach((item) => {
      idMap[item.id] = item.ans;
    });
    // Chuyển đối tượng thành mảng giữ lại chỉ giá trị cuối cùng của mỗi ID
    const result = Object.keys(idMap).map((id) => ({
      id: id,
      ans: idMap[id],
    }));
    const filteredResult = result.filter((item) => item.ans !== undefined);
    return filteredResult;
  };

  const nop = () => {
    let ketqua = filterAndKeepLast(listAns);
    setListAns(ketqua);
    // console.log("ket qua: ", ketqua);
    // console.log("key: ", listKey);

    for (let i = 0; i < ketqua.length; i++) {
      if (ketqua.length === listKey.length) {
        if (ketqua[i].ans === listKey[i].dap_an_dung) {
          countTrue++;
          setMatchQues(countTrue);
        }
      }
      if (ketqua.length !== listKey.length) {
        if (ketqua[i].ans === listKey[ketqua[i].id - 1].dap_an_dung) {
          countTrue++;
          setMatchQues(countTrue);
        }
      }
    }
    setPoint(countTrue * markPerQes);
  };
  const loadListTest = async () => {
    let res = await apiGetAllExamForStu();
    if (res && res.data) {
      localStorage.setItem("listIdTest", JSON.stringify(res.data));
    }
  };
  useEffect(() => {
    if(localStorage.getItem("role")) setRole(+localStorage.getItem("role"))
    if(+role === 2){
    // if(listKey) console.log("key app: ",listKey);
    if (listQuesNoShuf && listQuesNoShuf.length > 0) {
      let temp = shuffled([listQuesNoShuf]);
      setListQues(temp[0]);
      // console.log("list shuf: ", listQues);
      // console.log("length shuf: ", listQues.length);
    }
    loadListTest();
    if (localStorage.getItem("listIdTest")) {
      setListIdTest(JSON.parse(localStorage.getItem("listIdTest")));
      setListTest(JSON.parse(localStorage.getItem("listIdTest")));
    }
    // console.log(listIdTest);
    
    let answer = selectedAns;
    if (answer && answer !== null) {
      setListAns([...listAns, answer]);
      setSelectedAns("");
      // console.log("ans:", answer);
      // console.log("list ans: ", listAns);
    }}
    onLoadUser();
    // console.log(markPerQes);
  }, [window.location.pathname, selectedAns, listKey, listQuesNoShuf]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Nav />
        <AppRoutes
          setIsSession={setIsSession}
          setStart={setStart}
          nop={nop}
          listQues={listQues}
          handleGetAnswer={handleGetAnswer}
          listIdTest={listIdTest}
          start={start}
          point={point}
          matchQues={matchQues}
          length={listQues.length}
          isLoading={isLoading}
          setQuesNoShuf={setListQuesNoShuf}
          setKey={setListKey}
        />
        <div className="fixed-bottom text-start px-2 d-none d-sm-block">
          Copyright &copy; 2024 by QuizTest
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </BrowserRouter>
  );
}

export default App;
