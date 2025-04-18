import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import RegisterPage from "./pages/auth/Register";
import LoginPage from "./pages/auth/Login";
import UserDashboard from "./pages/home/user/Dashboard";
import AdminDashboard from "./pages/home/admin/Dashboard";
import OAuthRedirect from "./pages/auth/oauth-redirect";
import { ProtectedRoute } from "./middlewares/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth/sign-up" element={<RegisterPage />} />
        <Route path="/auth/sign-in" element={<LoginPage />} />
        <Route path="/oauth-redirect" element={<OAuthRedirect />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
