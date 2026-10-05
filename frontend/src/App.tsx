import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomPage from "./pages/HomPage";
import { Layout } from "./components/Layout";
import AlertDetailsPage from "./pages/AlertDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomPage />} />
            <Route path="/alert/:id" element={<AlertDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
