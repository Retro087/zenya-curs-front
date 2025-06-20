import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/usersSlice";
import { Link, useNavigate } from "react-router";
import s from "./style.module.css";
import ContainerLayout from "../../layouts/container-layout";
import Button from "../common/Button";
import PageLayout from "../../layouts/page-layout";
import BlockTitle from "../common/block-title";
import services from "../../services";
const UsersContainer = () => {
  const select = useSelector((state) => ({
    users: state.users.list,
    myId: state.auth.myId,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const createChat = async (user) => {
    const res = await services.chatsAPI.createChat(select.myId, user);

    const chatId = res.chat.id;

    navigate(`/chats/${chatId}`);
  };
  return (
    <div>
      <PageLayout>
        <ContainerLayout width={1140}>
          <BlockTitle title={"Пользователи"} />
          {select.users.length ? (
            select.users.map((i) => {
              return (
                <div className={s.user}>
                  <Link to={`/profile/${i.id}`}>{i.username}</Link>
                  <Button onClick={() => createChat(i.id)} value={"Написать"} />
                </div>
              );
            })
          ) : (
            <div>Пользователей нет</div>
          )}
        </ContainerLayout>
      </PageLayout>
    </div>
  );
};

export default UsersContainer;
