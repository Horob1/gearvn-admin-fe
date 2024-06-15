
import { useEffect, useRef } from "react";
import { dummyData } from "./dummy";
import { Message } from "./Message";

export const MessageList = () => {
  const lastMessage = useRef<HTMLDivElement>(document.createElement("div"));
  useEffect(() => {
    lastMessage.current.scrollIntoView();
  }, []);
  return (
    <>
      {dummyData.map((message, index) => {
        let level = 0;

        if (index === 0) {
          // First element
          if (dummyData?.[index + 1]?.position === message.position) {
            level = 1;
          }
        } else if (index === length - 1) {
          // Last element
          if (dummyData?.[index - 1]?.position === message.position) {
            level = 3;
          }
        } else {
          // Middle elements
          const prevPosition = dummyData?.[index - 1]?.position;
          const nextPosition = dummyData?.[index + 1]?.position;

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
