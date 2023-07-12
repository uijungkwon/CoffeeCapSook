import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Login";

function App(){
  return (
    <Router>
      <Switch>
        <Route path="/Login"><Login/></Route>
        <Route path="/"><Home/></Route>
      </Switch>
    </Router>
  );
}
export default App;