import { useAppStore } from "@/store/store";
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useRef } from "react";

// We used context to make the socket instance available throughout our app
const socketContext = createContext(null);

// This is our custom hook to access the socketContext
export const useSocket = () => {
  return useContext(socketContext);
};

//
export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { user } = useAppStore();

  useEffect(() => {
    if (user) {
      socket.current = io(import.meta.env.VITE_SERVER_URL, {
        withCredentials: true,
        query: { userId: user._id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socketServer Successfully");
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("message received", message);
          addMessage(message);
        }
      };

      socket.current.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [user]);

  return (
    <socketContext.Provider value={socket.current}>
      {children}
    </socketContext.Provider>
  );
};
