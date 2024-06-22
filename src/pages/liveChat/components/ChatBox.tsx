import { SendHorizontal } from "lucide-react";
import { MessageList } from "./MessageList";
import { ChatUser, MessageType } from "../LiveChatPage";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import toast from "react-hot-toast";

type ChatBoxProps = {
  user: ChatUser;
  socket: Socket;
};

export const ChatBox = ({ user, socket }: ChatBoxProps) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (socket == null || user.userId === "") return;

    socket.emit("getConversationAdmin", user.userId);

    socket.on("receiveConversationAdmin", (reUser: ChatUser) => {
      if (reUser.userId === user.userId) {
        setMessages(reUser.conversation);
      }
    });

    return () => {
      socket.off("receiveConversationAdmin");
    };
  }, [user, socket]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!socket) {
      toast.error("Socket connection is not available.");
      return;
    }

    if (message.trim() === "") {
      toast.error("Message cannot be empty.");
      return;
    }

    const newMessage: MessageType = {
      message: message,
      position: "end",
    };

    try {
      socket.emit("sendMessage", {
        ...newMessage,
        userId: user.userId,
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    } catch (error) {
      toast.error("Lỗi kết nối đến server");
    }
  };

  return (
    <div className="h-[680px] col-span-9 bg-white rounded-md">
      <div className="shadow-md h-[52px] flex justify-between px-4 items-center">
        <h1 className="font-semibold text-2xl text-gray-700 py-2">
          {user?.userId ? `ID: ${user.userId}` : "Chưa có hội thoại nào?"}
        </h1>
      </div>

      {user?.userId && (
        <>
          <div className="h-[576px] flex flex-col">
            <div className="flex-1"></div>
            <div className="overflow-y-auto pl-12 pr-2 pt-4 pb-1">
              <MessageList messages={messages} />
            </div>
          </div>
          <form
            onSubmit={handleSendMessage}
            className="h-[52px] rounded-b-md flex gap-4 p-2 px-4"
          >
            <input
              className="w-full outline-none rounded-2xl px-4 bg-[#F3F3F5]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Aa"
              type="text"
            />
            <button
              type="submit"
              className="p-2 rounded-full hover:bg-[#F3F3F5]"
            >
              <SendHorizontal />
            </button>
          </form>
        </>
      )}
    </div>
  );
};
