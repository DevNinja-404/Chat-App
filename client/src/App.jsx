import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { Button } from "@/components/ui/button";

// We need to wrap these componenets in lazy suspense because if we don't lazy load these components ,then whenever the app is loaded ,all of these components are loaded.But we only want to load the component of the route which we r on
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";

import "./App.css";

import { userServices } from "./services/users";
import { useEffect, useState } from "react";
import { useAppStore } from "./store/store";
import { toast } from "sonner";

const PrivateRoute = ({ children }) => {
  const { user } = useAppStore();
  const isAuthenticated = !!user;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { user } = useAppStore();
  const isAuthenticated = !!user;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const [loading, setLoading] = useState(true);
  const { setUser } = useAppStore();
  const user = useAppStore((state) => state.user);
  console.log(user);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await userServices.getCurrentUser();
        if (response?.data) {
          setUser(response?.data?.data);
        }
      } catch (err) {
        console.log(err);
        setUser({});
      } finally {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, [setUser]);

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center text-3xl">
      Loading...
    </div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Whatever route a user want to go,if it doesn't match with the routes mentioned here then navigate to "/auth" */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
