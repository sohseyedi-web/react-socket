import React, { useState } from "react";

const Messages = () => {
  const currentUserId = "123";

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "سلام!",
      senderId: "123",
      senderImg: "https://i.pravatar.cc/40?img=1",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "چطوری؟",
      senderId: "456",
      senderImg: "https://i.pravatar.cc/40?img=2",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      text: "خوبم، تو چطوری؟",
      senderId: "123",
      senderImg: "https://i.pravatar.cc/40?img=1",
      timestamp: "10:35 AM",
    },
  ]);

  return (
    <>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex items-end gap-2 ${
            msg.senderId === currentUserId ? "justify-end" : "justify-start"
          }`}
        >
          {/* عکس فرستنده پیام */}
          {msg.senderId !== currentUserId && (
            <img
              src={msg.senderImg}
              alt="User"
              className="size-9 object-cover rounded-2xl"
            />
          )}

          {/* محتوای پیام */}
          <div
            className={`p-2 rounded-md shadow-md min-w-[100px] max-w-[200px] break-words flex flex-col ${
              msg.senderId === currentUserId
                ? "bg-blue-500 text-white rounded-tl-2xl"
                : "bg-gray-300 text-black rounded-tr-2xl"
            }`}
          >
            <span className="text-right">{msg.text}</span>
            <span className="text-xs text-gray-200 text-right">
              {msg.timestamp}
            </span>
          </div>

          {/* عکس برای پیام‌های خود کاربر */}
          {msg.senderId === currentUserId && (
            <img
              src={msg.senderImg}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Messages;
