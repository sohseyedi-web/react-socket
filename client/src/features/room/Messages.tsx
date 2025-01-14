import { MessageTypes } from "@/types";
import { formatTime } from "@/utils/formatDate";
import { useEffect, useRef } from "react";

type MessageProps = {
  currentUser: string;
  messages: MessageTypes[];
};

const Messages = ({ currentUser, messages }: MessageProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <>
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`flex items-center  my-2 gap-2 ${
            msg.sender === currentUser ? "justify-end" : "justify-start"
          }`}
        >
          {msg.sender !== currentUser && (
            <img
              src={msg.senderImg}
              alt="User"
              className="size-9 object-cover rounded-2xl"
            />
          )}

          <div className="flex flex-col">
            <div
              className={`px-2 py-3 rounded-md shadow-md min-w-[100px] max-w-[200px] break-words flex flex-col ${
                msg.sender === currentUser
                  ? "bg-blue-500 text-white rounded-tl-2xl"
                  : "bg-zinc-700 text-white rounded-tr-2xl"
              }`}
            >
              <span className="text-right">{msg.message}</span>
            </div>
            <span
              className={`text-xs font-semibold text-zinc-700 ${
                msg.sender === currentUser ? "text-right" : "text-left"
              }  mt-1`}
            >
              {formatTime(msg.timestamp.toLocaleString())}
            </span>
          </div>
          {msg.sender === currentUser && (
            <img
              src={msg.senderImg}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default Messages;
