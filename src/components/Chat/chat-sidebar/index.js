import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../../store/chatsSlice";
import s from "./style.module.css";
import ChatItem from "./chat-item";
import BlockTitle from "../../common/block-title";
import { Link } from "react-router";
const ChatSidebar = ({ acitve }) => {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    chats: state.chats.chats,
  }));
  useEffect(() => {
    dispatch(getChats());
  }, []);

  if (!select.chats) {
    return;
  }

  return (
    <div className={s.wrap}>
      <BlockTitle title={"Чаты"} />

      {select.chats.length ? (
        select.chats.map((i, ind) => {
          return <ChatItem active={acitve} key={ind} item={i} />;
        })
      ) : (
        <Link to={"/users"}>Найти пользователей</Link>
      )}
    </div>
  );
};

export default ChatSidebar;
