import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

// We need to wrap these componenets in lazy suspense because if we don't lazy load these components ,then whenever the app is loaded ,all of these components are loaded.But we only want to load the component of the route which we r on
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />

        {/* Whatever route a user want to go,if it doesn't match with the routes mentioned here then navigate to "/auth" */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
