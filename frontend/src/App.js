import { Route, Routes } from "react-router-dom";
import Home from "./features/home/home";
import Login from "./features/login/login";
import Signup from "./features/signup/signup";
import NotFound from "./features/notfound/notfound";
import AuthComponent from "./features/Auth/AuthComponent";
import "./styles/style.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route element={<AuthComponent />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
