import { Home } from "lucide-react";
import ava from "./../../assets/gearvn.png";
import { ChatBox } from "./components/ChatBox";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { cloneDeep } from "lodash";
export type MessageType = {
  position: string;
  message: string;
};
export type ChatUser = {
  userId: string;
  conversation: MessageType[];
};
export const LiveChatPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [checks, setChecks] = useState<boolean[]>([]);
  const [currentUser, setCurrentUser] = useState<ChatUser>({
    userId: "",
    conversation: [],
  });

  useEffect(() => {
    const newSocket: Socket = io(import.meta.env.VITE_API_BASE_URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("getOnlineUsers", (res) => {
      setUsers(res);
      const checkList = res.map((user: ChatUser) => {
        const oldUser = users.find((oldUser) => oldUser.userId === user.userId);
        if (oldUser) {
          return !(
            oldUser?.conversation?.length === user?.conversation?.length
          );
        } else return true;
      });
      setChecks(checkList);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, users]);

  useEffect(() => {
    if (!users.find((user) => user.userId === currentUser.userId)) {
      setCurrentUser({
        userId: "",
        conversation: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <div className="main-container p-4 m-auto rounded-xl shadow-xl w-full md:max-w-[90%] xl:max-w-screen-xl md:min-h-[80%] bg-[#F5F5F5] animate-growth grid grid-cols-12 gap-4">
      <div className="h-[680px] col-span-3 bg-white rounded-md">
        <div className="shadow-md h-[52px] flex justify-between px-4 items-center">
          <h1 className="font-semibold text-2xl text-gray-700  py-2">
            Đoạn chat
          </h1>
          <Link to={"/"}>
            <button className="btn btn-error">
              <Home />
            </button>
          </Link>
        </div>

        <div className="chat-list h-[620px] flex flex-col gap-2 p-2 overflow-y-auto">
          {users && users.length != 0 ? (
            users.map((user, index) => (
              <div
                key={user.userId}
                onClick={() => {
                  setCurrentUser(user);
                  const checkList = cloneDeep(checks);
                  checkList[index] = false;
                  setChecks(checkList);
                }}
                className={`w-full flex justify-between hover:bg-[#F5F5F5] ${
                  currentUser.userId === user.userId && "bg-[#F5F5F5]"
                } p-3 rounded-md items-center`}
              >
                <div className="flex gap-6 items-center">
                  <div className="avatar avatar-ring-success">
                    <img src={ava} alt="avatar" />
                  </div>
                  <div>
                    <h1 className="text-black font-semibold text-base">
                      ID: {user.userId.slice(0, 8)}...
                    </h1>
                    <h5
                      className="text-gray-700 text-sm"
                      style={{
                        fontWeight: checks[index] ? "700" : "400",
                      }}
                    >
                      {user?.conversation?.[user?.conversation.length - 1]
                        ?.position === "start"
                        ? "Khách"
                        : "Bạn"}
                      {": "}
                      {user?.conversation?.[
                        user?.conversation?.length - 1
                      ]?.message?.slice(
                        0,
                        user?.conversation[user?.conversation?.length - 1]
                          .message.length > 10
                          ? 10
                          : user?.conversation[user?.conversation?.length - 1]
                              ?.message?.length - 1
                      )}
                      ...
                    </h5>
                  </div>
                </div>
                {checks[index] && (
                  <div className="p-2 rounded-full bg-success"></div>
                )}
              </div>
            ))
          ) : (
            <div className="rounded-md skeleton"></div>
          )}
        </div>
      </div>
      {socket && <ChatBox socket={socket} user={currentUser} />}
    </div>
  );
};
