import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./sections/Admin";
import Main from "./sections/Main";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);

export default App;
