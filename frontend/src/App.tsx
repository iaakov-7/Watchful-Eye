import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomPage from "./pages/HomPage";

import AlertDetailsPage from "./pages/AlertDetailsPage";
import AddAlertPage from "./pages/AddAlertPage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomPage />} />
            <Route path="/alert/:id" element={<AlertDetailsPage />} />
            <Route path="/alert/new" element={<AddAlertPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
