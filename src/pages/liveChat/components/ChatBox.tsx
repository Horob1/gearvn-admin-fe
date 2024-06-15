import { SendHorizontal } from "lucide-react";
import { MessageList } from "./MessageList";
export const ChatBox = () => {
  return (
    <div className="h-[680px] col-span-9  bg-white rounded-md">
      <div className="shadow-md h-[52px] flex justify-between px-4 items-center">
        <h1 className="font-semibold text-2xl text-gray-700  py-2">
          ID: CT060202
        </h1>
        <button className="btn btn-error">Mark Done</button>
      </div>
      <div className="h-[576px] flex flex-col">
        <div className="flex-1"></div>
        <div className="overflow-y-auto pl-12 pr-2 pt-4 pb-1">
          <MessageList />
        </div>
      </div>
      <form className="h-[52px] rounded-b-md flex gap-4 p-2 px-4 ">
        <input
          className="w-full outline-none rounded-2xl px-4 bg-[#F3F3F5]"
          placeholder="Aa"
          type="text"
        />
        <button className="p-2 rounded-full hover:bg-[#F3F3F5]">
          <SendHorizontal />
        </button>
      </form>
    </div>
  );
};
