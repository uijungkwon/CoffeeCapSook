import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Header from "./Routes/Header";
import Enroll from "./Routes/Enroll";
import Mypage from "./Routes/Mypage";
import AllCap from "./Routes/AllCap";
import QuizPage from "./pages/QuizPage";
import QuizCard from "./components/QuizCard";
import ResultCard from "./components/ResultCard";
import ResultPage from "./pages/ResultPage";

function App(){
  return (
    <Router>
      <Header/>
    <Switch>
    
    <Route path ='/QuizPage/:id'><QuizCard/></Route>
    <Route path ='/QuizPage'><QuizPage/></Route>

    <Route path ='/ResultPage/:tendency'><ResultCard/></Route>
    <Route path ='/ResultPage'><ResultPage/></Route>

       <Route path="/Login"><Login/></Route>
       <Route path="/Enroll"><Enroll/></Route>
       <Route path="/Mypage"><Mypage/></Route>
       <Route path="/AllCap"><AllCap/></Route>
        <Route path="/"><Home/></Route>
      </Switch>
    </Router>
  );
}
export default App;