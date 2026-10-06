import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomPage from "./pages/HomPage";

import AlertDetailsPage from "./pages/AlertDetailsPage";
import AddAlertPage from "./pages/AddAlertPage";
import Layout from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<ProtectedRoute children={<HomPage />} />}
            />
            <Route
              path="/alert/:id"
              element={<ProtectedRoute children={<AlertDetailsPage />} />}
            />
            <Route
              path="/alert/new"
              element={<ProtectedRoute children={<AddAlertPage />} />}
            />
            <Route
              path="/admin"
              element={<ProtectedRoute children={<AdminPage />} />}
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
