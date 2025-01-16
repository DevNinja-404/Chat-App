import { useAppStore } from "@/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./components/contacts-container/ContactContainer";
import ChatContainer from "./components/chat-container/ChatContainer";
import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const { user, selectedChatType } = useAppStore();
  console.log(selectedChatType);

  useEffect(() => {
    if (!user?.isProfileComplete) {
      toast.message("Please complete profile to continue...");
      navigate("/profile");
    }
  }, [navigate, user]);

  return (
    <div className="flex h-screen text-white overflow-hidden">
      <ContactContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
