import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import Homepage from "./pages/Homepage";
import CreateProfilePage from "./pages/CreateProfilePage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/login/forgot_password" element={<ForgotPasswordPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/create_profile" element={<CreateProfilePage />}>

        </Route>
      </Routes>
      <div className="App">
        {/* <h1 className=" font-bold underline">Hello world!</h1> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
