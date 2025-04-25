import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { over } from "stompjs";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SockJS from "sockjs-client/dist/sockjs";
import CloseIcon from "@mui/icons-material/Close";
import { getChatMessagesByProjectIdAction } from "../../../../redux/Chat/Action";
import TeacherChatMessage from "../Chat/TeacherChatMessage";
import { getCurrentStageByProjectIdAction } from "../../../../redux/InstructorProgress/Action";
import toast from "react-hot-toast";

var client = null;
const TeacherTabChatMessage = () => {
  const { chatReducer, instructorProgressReducer } = useSelector(
    (store) => store
  );
  const { authReducer } = useSelector((store) => store);

  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isSelectedMessage, setIsSelectedMessage] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const currentMessageRef = useRef({});

  useEffect(() => {
    // get chat messages:
    if (instructorProgressReducer.project?.projectId) {
      dispatch(
        getChatMessagesByProjectIdAction({
          projectId: instructorProgressReducer.project?.projectId,
        })
      );
    }

    // get current stage by projectId:
    if (instructorProgressReducer.project?.projectId) {
      dispatch(
        getCurrentStageByProjectIdAction({
          projectId: instructorProgressReducer.project?.projectId,
        })
      );
    }
  }, [instructorProgressReducer.project?.projectId, dispatch]);

  // handle set chat message
  useEffect(() => {
    setMessages(chatReducer.messages);
  }, [chatReducer.messages]);

  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; // get url from env file (both dev and product)

  // handle connect to websocket server:
  useEffect(() => {
    let socket = new SockJS(SOCKET_URL);
    client = over(socket);

    client.connect(
      {},
      () => {
        console.log(
          "--------------------Connected to the Websocket server--------------------"
        );

        // subscibe to the topic:
        client.subscribe(
          `/topic/project.${instructorProgressReducer.project?.projectId}`,
          (msg) => {
            const receivedMessage = JSON.parse(msg.body);

            setMessages((prevMessages) => {
              // for sending message without duplicate chatMessageId
              if (
                !prevMessages.some(
                  (item) => item.chatMessageId === receivedMessage.chatMessageId
                )
              ) {
                return [...prevMessages, JSON.parse(msg.body)];
              } else {
                // for update when revoke message
                return prevMessages.map((item) =>
                  item.chatMessageId === receivedMessage.chatMessageId
                    ? receivedMessage
                    : item
                );
              }
            });
          }
        );
      },
      (error) => {
        console.error(
          "+++++++++++++++++++++++++++WebSocket connection error:",
          error
        );
      }
    );
    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, [instructorProgressReducer.project?.projectId]);

  // handle send message:
  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Vui lòng nhập nội dung tin nhắn!");
      return;
    }

    const chatMessage = {
      projectId: instructorProgressReducer.project?.projectId,
      stageId: instructorProgressReducer.currentStage?.stageId,
      senderId: authReducer.user?.accountId,
      content: message,
      parentMessageId: isSelectedMessage
        ? isSelectedMessage.chatMessageId
        : null,
    };

    console.log(chatMessage);
    stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
    setMessage("");
    setIsSelectedMessage(null);
    inputRef.current.focus();
  };

  // handle select message :
  const handleSelectMessage = (item) => {
    setIsSelectedMessage(item);
    inputRef.current.focus();
  };

  // handle scroll to parent message
  const handleScrollToParentMessage = (parentMessageId) => {
    if (currentMessageRef.current[parentMessageId]) {
      const parentElement = currentMessageRef.current[parentMessageId];
      const chatContainer = chatContainerRef.current;

      // offsetTop : khoảng cách từ element hiện tại tới đỉnh của toàn bộ trag web
      // clientHeight: height của element hiện tại
      if (chatContainer) {
        // Tính toán để parentElement nằm ở cuối khung chat
        const targetScrollTop =
          parentElement.offsetTop -
          chatContainer.offsetTop -
          (chatContainer.clientHeight - parentElement.clientHeight);

        chatContainer.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
    }
  };

  // handle message scroll to latest message:
  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTo({
        // top : là vị trí cuộn dọc của phần tử ---- top : 0 -> scroll tới vị trí đầu tiên của div, top : scrollHeight -> scroll tới vị trí cuối cùng div
        top: chatContainerRef.current.scrollHeight, // scrollHeight : là tổng height của div chatContainerRef
        behavior: "smooth",
      });
  }, [messages]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border w-[60%] shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-center font-semibold text-xl uppercase border-b py-5">
          Hỏi đáp thắc mắc
        </h1>
        <div
          ref={chatContainerRef}
          className="h-[380px] bg-gray-100 overflow-y-auto p-5 space-y-5"
        >
          {messages?.map((item, index) => {
            return (
              <TeacherChatMessage
                sender={item.sender}
                content={item.content}
                createdAt={item.timestamp}
                parentMessage={item.parentMessage}
                stageOfMessage={item.stage}
                isOwnMessage={
                  item.sender?.accountId === authReducer.user?.accountId
                }
                chatMessageId={item.chatMessageId}
                stompClient={stompClient}
                projectId={instructorProgressReducer.project?.projectId}
                isRevokedMessage={item.isRevoked}
                setMessages={setMessages}
                onSelectMessage={handleSelectMessage}
                currentMessageRef={(el) => {
                  if (el) {
                    currentMessageRef.current[item.chatMessageId] = el;
                  }
                }}
                onScrollToParentMessage={handleScrollToParentMessage}
                key={index}
              />
            );
          })}
        </div>
        <div className="flex flex-col bg-slate-50 pt-2">
          {isSelectedMessage && (
            <div className="relative flex gap-4 p-3 bg-blue-100 mx-3 rounded-lg border-l-4 border-blue-400">
              <img
                className="w-8 h-8 rounded-full self-start object-cover object-top"
                src={isSelectedMessage?.sender.image}
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-md">
                  {isSelectedMessage?.sender.fullName}
                </h3>
                <p className="text-sm">{isSelectedMessage?.content}</p>
              </div>

              <div className="absolute top-1 right-3">
                <IconButton
                  size="small"
                  onClick={() => setIsSelectedMessage(null)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 justify-center p-1 shadow-lg">
            <input
              className="w-full py-2 rounded-full px-5 border bg-gray-200 focus:outline-none"
              type="text"
              placeholder="Aa"
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton
              sx={{ padding: 1 }}
              color="info"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTabChatMessage;
