import React from "react";

const ChatMessage = ({ avatar, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-end gap-3 ${
          isOwnMessage ? "flex-row-reverse" : ""
        }`}
      >
        <img className="w-7 h-7 rounded-full" src={avatar} />
        <div className="max-w-[70%]">
          <div
            className={`flex items-center gap-3 ${
              isOwnMessage ? "flex-row-reverse" : ""
            }`}
          >
            <h3 className={`text-[12px] ${!isOwnMessage ? "ml-3" : "mr-3"}`}>
              Quốc Đạt {isOwnMessage ? "(Bạn)" : ""}
            </h3>
            <p className="text-sm font-medium">10:30 AM</p>
          </div>
          <p
            className={`${
              isOwnMessage
                ? "bg-blue-400 rounded-br-none"
                : "bg-gray-400 rounded-bl-none"
            }  rounded-xl inline-block py-2 px-4 text-justify`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
