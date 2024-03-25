import "./App.scss";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import AppRoutes from "./Components/Routes/AppRoutes";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSession, setIsSession] = useState(false);
  const [selectedAns, setSelectedAns] = useState({});
  const [listAns, setListAns] = useState([]);
  const [matchQues, setMatchQues] = useState(0);
  const [point, setPoint] = useState(0);
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
  const [listKey, setListKey] = useState([
    { id: "1", ans: "B" },
    { id: "2", ans: "B" },
    { id: "3", ans: "A" },
    { id: "4", ans: "C" },
    { id: "5", ans: "D" },
  ]);
  const [listIdTest, setListIdTest] = useState([
    { id: "TDH202024", name: "Toán Lớp 3" },
    { id: "TDH202023", name: "Lý Lớp 7" },
    { id: "TDH202022", name: "Hóa Lớp 11" },
    { id: "TDH202021", name: "Địa Lớp 12" },
  ]);
  const [listQues, setListQues] = useState(shuffled([

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
  ]));
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

    for (let i = 0; i < ketqua.length; i++) {
      if (ketqua.length === listKey.length) {
        if (
          // ketqua[i].id === listKey[i].id &&
          ketqua[i].ans === listKey[i].ans
        ) {
          countTrue++;
          setMatchQues(countTrue);
        }
      }
      if (ketqua.length !== listKey.length) {
        if (ketqua[i].ans === listKey[ketqua[i].id - 1].ans) {
          countTrue++;
          setMatchQues(countTrue);
        }
      }
    }
    setPoint(countTrue * markPerQes);
  };

  // const handleSession = () => {
  //   let session = sessionStorage.getItem("key");
  //   if (session) {
  //     setIsSession(true);
  //   }
  // };
  useEffect(() => {
    let answer = selectedAns;
    // let shuffledArray = shuffled(listQues);
    // setListQues(shuffledArray);
    // let role = localStorage.getItem("role");
    if (answer && answer !== null) {
      setListAns([...listAns, answer]);
      setSelectedAns("");
      // console.log("ans:", answer);
    }
    // console.log(markPerQes);
  }, [window.location.pathname, selectedAns]);

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
