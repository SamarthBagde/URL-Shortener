import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LinksPage from "./pages/LinksPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectRoute from "./components/ProtectRoute";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
import RedirectPage from "./pages/RedirectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <HomePage />
            </ProtectRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/links"
          element={
            <ProtectRoute>
              <LinksPage />
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectRoute>
              <ProfilePage />
            </ProtectRoute>
          }
        />

        <Route path="/:shortId" element={<RedirectPage />} />

        <Route path="*" element={<NotFoundErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
