import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./chat-list";
import { io } from "socket.io-client";
import { addMessage, getMessages, readMessage } from "../../store/chatsSlice";
import { useParams } from "react-router";
import { socket } from "../../socket/socket";
import ContainerLayout from "../../layouts/container-layout";
import { getChats } from "../../store/chatsSlice";
import ChatSidebar from "./chat-sidebar";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const select = useSelector((state) => ({
    messages: state.chats.messages,
    load: state.chats.load,
    myId: state.auth.myId,
    selected: state.chats.selectedChat,
    isAuth: state.auth.isAuth,
  }));

  useEffect(() => {
    if (params.id) {
      dispatch(getMessages(params.id));

      const handleNewMessage = (message) => {
        dispatch(addMessage(message.message));
      };

      const handleMessageError = (error) => {
        console.error("Message error:", error);
        alert(`Error: ${error.message}`);
      };

      socket.on("newMessage", handleNewMessage);
      socket.on("messageError", handleMessageError);

      // Присоединяемся к комнате (чату)
      socket.emit("join_room", { id: params.id });

      return () => {
        socket.off("newMessage", handleNewMessage);
        socket.off("messageError", handleMessageError);
      };
    }
  }, [select.myId, params.id]);

  const sendMessage = async (content, chatId) => {
    try {
      //  Получаем токен (например, из Redux или localStorage)
      //  Функция для получения токена

      await socket.emit("sendMessage", {
        senderId: select.myId,
        recieverId: params.reciever,
        chatId: chatId,
        content: content,
        token: "token",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };
  if (!select.isAuth) {
    return (window.location.href = "/auth");
  }

  return (
    <ContainerLayout h="800px" alignItems="stretch" display="flex" width={1140}>
      <ChatSidebar acitve={params.id} />
      <ChatList
        active={params.id}
        myId={select.myId}
        send={sendMessage}
        list={select.messages}
      />
    </ContainerLayout>
  );
};

export default ChatContainer;
