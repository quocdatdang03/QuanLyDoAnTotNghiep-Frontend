import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import defaultImage from "../../../../assets/images/default-avatar.png";

const TeacherChatMessage = ({
  sender,
  content,
  createdAt,
  parentMessage,
  stageOfMessage,
  isOwnMessage,
  chatMessageId,
  stompClient,
  projectId,
  isRevokedMessage,
  setMessages,
  onSelectMessage,
  onScrollToParentMessage,
  currentMessageRef,
}) => {
  const [isShowTimeDetail, setIsShowTimeDetail] = useState(false);

  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: vi,
    roudingMethod: "floor",
  });

  const formattedDateDetail = new Date(createdAt).toLocaleString("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // handle show time detail:
  const handleShowTimeDetail = () => {
    setIsShowTimeDetail(!isShowTimeDetail);
  };

  // handle revoke message:
  const handleRevokeMessage = () => {
    const deleteChatMessageData = {
      chatMessageId: chatMessageId,
      senderId: sender?.accountId,
      projectId: projectId,
      stageId: stageOfMessage?.stageId,
    };

    stompClient.send(
      "/app/revokeMessage",
      {},
      JSON.stringify(deleteChatMessageData)
    );
  };

  const handleMoveToParentMessage = (e, parentMessageId) => {
    e.stopPropagation();
    console.log("H!LLLOO");
    onScrollToParentMessage(parentMessageId);
  };

  return (
    <div ref={currentMessageRef}>
      {/*  message time */}
      <div
        className={`text-center text-[11px] text-gray-500 transition-all duration-200 overflow-hidden ${
          isShowTimeDetail || isRevokedMessage
            ? "h-auto opacity-100 py-2"
            : "h-0 opacity-0"
        }`}
      >
        {formattedDateDetail}
      </div>

      <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
        <div
          className={`flex items-center gap-3 ${
            isOwnMessage ? "flex-row-reverse" : ""
          }`}
        >
          <img
            className="w-7 h-7 rounded-full object-cover object-top"
            src={sender?.image}
          />
          <div className="flex flex-col">
            <div
              className={`flex items-center gap-x-3 mb-1 ${
                isOwnMessage ? "flex-row-reverse" : ""
              }`}
            >
              <h3
                className={`text-[12px] ${
                  isOwnMessage ? "text-end" : "text-start"
                }`}
              >
                {sender?.fullName}
              </h3>
              <Chip
                label={stageOfMessage?.stageName}
                color="success"
                size="small"
              />
            </div>
            {isRevokedMessage ? (
              // Revoked message
              <div
                className={`${
                  isOwnMessage ? "self-end ml-10" : "self-start mr-10"
                } rounded-xl border border-gray-400 bg-gray-200 inline-block py-2 px-4 text-justify cursor-default duration-150`}
              >
                Tin nhắn đã được thu hồi
              </div>
            ) : (
              <div
                onClick={handleShowTimeDetail}
                className={`${
                  isOwnMessage
                    ? "bg-blue-400 rounded-br-none self-end ml-10"
                    : "bg-gray-300 rounded-bl-none self-start mr-10"
                } rounded-xl inline-block py-2 px-4 text-justify cursor-default duration-150 group relative`}
              >
                {parentMessage && (
                  // Parent message
                  <div
                    className="flex gap-4 p-3 bg-blue-100 mb-2 rounded-lg border-l-4 border-blue-500 cursor-pointer"
                    onClick={(e) =>
                      handleMoveToParentMessage(e, parentMessage.chatMessageId)
                    }
                  >
                    <img
                      className="w-8 h-8 rounded-full self-start object-cover object-top"
                      src={parentMessage?.sender.image}
                    />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-md">
                        {parentMessage?.sender.fullName}
                      </h3>
                      <p className="text-sm">
                        {parentMessage.isRevoked
                          ? "Tin nhắn đã được thu hồi"
                          : parentMessage.content}
                      </p>
                    </div>
                  </div>
                )}

                <span>{content}</span>

                {/* tool set */}
                <div
                  className={`absolute invisible opacity-0 scale-0 ${
                    isShowTimeDetail && "opacity-100 scale-100 visible"
                  } group-hover:opacity-100 group-hover:visible group-hover:scale-100 flex items-center gap-2 bottom-0 ${
                    isOwnMessage ? "-left-20" : "-right-20"
                  } py-1 px-3 bg-gray-300 rounded-lg transition-all duration-300`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* div connector */}
                  <div
                    className={`absolute bottom-1/2 translate-y-1/2 h-6 opacity-0 ${
                      isOwnMessage ? "left-full w-5" : "right-full w-10"
                    } `}
                  ></div>
                  {isOwnMessage && (
                    <DeleteIcon
                      className="hover:text-blue-500 transition-all duration-200 cursor-pointer"
                      sx={{ fontSize: 18 }}
                      onClick={handleRevokeMessage}
                    />
                  )}

                  <FormatQuoteIcon
                    className="hover:text-blue-500 transition-all duration-200 cursor-pointer"
                    sx={{ fontSize: 18 }}
                    onClick={() =>
                      onSelectMessage({ chatMessageId, sender, content })
                    }
                  />
                </div>
              </div>
            )}

            {/* timestamp */}
            <p
              className={`text-[12px] font-medium mt-1 ${
                isOwnMessage ? "text-end" : "text-start"
              }`}
            >
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherChatMessage;
