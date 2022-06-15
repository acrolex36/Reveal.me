import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
      </Routes>
      <div className="App">
        {/* <h1 className=" font-bold underline">Hello world!</h1> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
