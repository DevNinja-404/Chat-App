import { useAppStore } from "@/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();

  useEffect(() => {
    if (!user?.isProfileComplete) {
      toast.message("Please complete profile to continue...");
      navigate("/profile");
    }
  }, [navigate, user]);

  return <div>Chat</div>;
};

export default Chat;
