import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login"
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Login></Login>
        <h1 className=" font-bold underline">Hello world!</h1>
      </div>
    </BrowserRouter>
  );
};

export default App;
