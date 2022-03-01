import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./sections/Admin";
import Main from "./sections/Main";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Main />} />
    </Routes>
  </BrowserRouter>
);

export default App;
