import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import Homepage from "./pages/Homepage";
import CreateProfilePage from "./pages/CreateProfilePage";
import ChatPage from "./pages/ChatPage";
import LandingPage from "./pages/LandingPage";
import './index.css'
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/explore" element={<ExplorePage />}></Route>

          <Route
          path="/login/forgot_password"
          element={<ForgotPasswordPage />}
        ></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/create_profile" element={<CreateProfilePage />}></Route>
        <Route path="/profile_page" element={<ProfilePage />}></Route>
        <Route path="/messages" element={<ChatPage />}></Route>
      </Routes>
      <div className="App">
        {/* <h1 className=" font-bold underline">Hello world!</h1> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
