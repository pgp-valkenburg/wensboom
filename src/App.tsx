import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./sections/Main";

const AdminPanel = React.lazy(() => import("./sections/Admin"));

const Admin: React.VFC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AdminPanel />
  </Suspense>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Main />} />
    </Routes>
  </BrowserRouter>
);

export default App;
