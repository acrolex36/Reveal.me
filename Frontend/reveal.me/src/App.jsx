import { BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Homepage></Homepage>
      </div>
    </BrowserRouter>
  );
};

export default App;
