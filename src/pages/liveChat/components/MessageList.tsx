
import { useEffect, useRef } from "react";
import { Message } from "./Message";
import { MessageType } from "../LiveChatPage";
 type MessageListProps ={
  messages: MessageType[]
 }
export const MessageList = ({messages}: MessageListProps) => {
  const lastMessage = useRef<HTMLDivElement>(document.createElement("div"));
  useEffect(() => {
    lastMessage.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      {messages.map((message, index) => {
        let level = 0;

        if (index === 0) {
          // First element
          if (messages?.[index + 1]?.position === message.position) {
            level = 1;
          }
        } else if (index === length - 1) {
          // Last element
          if (messages?.[index - 1]?.position === message.position) {
            level = 3;
          }
        } else {
          // Middle elements
          const prevPosition = messages?.[index - 1]?.position;
          const nextPosition = messages?.[index + 1]?.position;

          if (
            prevPosition === message.position &&
            nextPosition === message.position
          ) {
            level = 2;
          } else if (nextPosition === message.position) {
            level = 1;
          } else if (prevPosition === message.position) {
            level = 3;
          }
        }

        return (
          <Message
          key={`${Math.random()}-${Date.now()}-${message.position}-${message.message}-${level}`}
            level={level}
            position={message.position}
            message={message.message}
          />
        );
      })}
      <div ref={lastMessage}></div>
    </>
  );
};
