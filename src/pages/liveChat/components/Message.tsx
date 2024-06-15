import ava from "./../../../assets/gearvn.png";
type MessageProps = {
  position: string;
  level: number;
  message: string;
};
export const Message = ({ position, level, message }: MessageProps) => {
  return (
    <div className="w-full flex justify-between">
      {position === "end" && <div className="flex-1"></div>}
      {level === 0 && (
        <div className="max-w-[45%] bg-error px-4 py-2 mt-1 rounded-3xl text-white break-words whitespace-pre-wrap relative">
          {message}
          {position === "start" && (
            <img
              src={ava}
              alt="gearvn"
              className="absolute h-10 w-10 bottom-0 -left-11"
            />
          )}
        </div>
      )}
      {level === 1 && (
        <div
          className={`max-w-[45%] bg-error px-4 py-2 mt-1 rounded-sm rounded-t-3xl ${
            position === "end" ? "rounded-bl-3xl" : "rounded-br-3xl"
          } text-white break-words whitespace-pre-wrap`}
        >
          {message}
        </div>
      )}
      {level === 2 && (
        <div
          className={`max-w-[45%] bg-error px-4 py-2 mt-1 rounded-sm ${
            position === "end"
              ? "rounded-bl-3xl rounded-tl-3xl"
              : "rounded-br-3xl rounded-tr-3xl"
          } text-white break-words whitespace-pre-wrap`}
        >
          {message}
        </div>
      )}
      {level === 3 && (
        <div
          className={`max-w-[45%] bg-error px-4 py-2 mt-1 rounded-sm rounded-b-3xl ${
            position === "end" ? "rounded-tl-3xl" : "rounded-tr-3xl"
          } text-white break-words whitespace-pre-wrap relative`}
        >
          {message}

          {position === "start" && (
            <img
              src={ava}
              alt="gearvn"
              className="absolute h-10 w-10 bottom-0 -left-11"
            />
          )}
        </div>
      )}
    </div>
  );
};
