import { Home } from "lucide-react";
import ava from "./../../assets/gearvn.png";
import { ChatBox } from "./components/ChatBox";
import { Link } from "react-router-dom";
export const LiveChatPage = () => {
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
          <div className="w-full flex justify-between hover:bg-[#F5F5F5] bg-[#F5F5F5] p-3 rounded-md items-center">
            <div className="flex gap-6 items-center">
              <div className="avatar avatar-ring-success">
                <img src={ava} alt="avatar" />
              </div>
              <div>
                <h1 className="text-black font-semibold text-base">
                  ID: CT060202
                </h1>
                <h5 className="text-gray-700 text-sm">Bạn: CT060202</h5>
              </div>
            </div>
            <div className="p-2 rounded-full bg-success"></div>
          </div>
          <div className="w-full flex justify-between hover:bg-[#F5F5F5] p-3 rounded-md items-center">
            <div className="flex gap-6 items-center">
              <div className="avatar avatar-ring-error">
                <img src={ava} alt="avatar" />
              </div>
              <div>
                <h1 className="text-black font-semibold text-base">
                  ID: CT060202
                </h1>
                <h5 className="text-gray-700 text-sm">Bạn: CT060202</h5>
              </div>
            </div>
            <div className="p-2 rounded-full bg-error"></div>
          </div>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
            <div className="w-full flex justify-between hover:bg-[#F5F5F5] p-3 rounded-md items-center">
              <div className="flex gap-6 items-center">
                <div className="avatar avatar-ring-error">
                  <img src={ava} alt="avatar" />
                </div>
                <div>
                  <h1 className="text-black font-semibold text-base">
                    ID: CT060202
                  </h1>
                  <h5 className="text-gray-700 text-sm">Bạn: CT060202</h5>
                </div>
              </div>
              <div className="p-2 rounded-full bg-error"></div>
            </div>
          ))}
          {/* <div className="rounded-md skeleton"></div> */}
        </div>
      </div>
      {/* outlet */}
      <ChatBox />
    </div>
  );
};
