import React, { useState } from "react";
import s from "./style.module.css";

import ContainerLayout from "../../../../layouts/container-layout";
import loopa from "../../../../assets/search.png";
import icon from "../../../../assets/icon.png";
import group from "../../../../assets/group.png";

import { Link } from "react-router";

const Header = (props) => {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);
  const [hide, setHide] = useState(true);

  return (
    <div className={s.wrap}>
      <ContainerLayout justify="space-between" display={"flex"} width={1140}>
        <Link to={"/"}>
          <div className={s.logo}>StarLine</div>
        </Link>
        <Link to={"/users"}>
          <img className={s.group} src={group} />
        </Link>
        <div className={s.profile}>
          <div onClick={() => setHide(!hide)} className={s.profile_block}>
            <span className={s.login}>{props.profile?.username}</span>
            <div className={s.icon}>
              <img src={props.profile.photo ? props.profile.photo : icon} />
            </div>
            {!hide ? (
              <ul className={s.hide}>
                <li onClick={props.toProfile} className={s.hide_item}>
                  Профиль
                </li>
                <li onClick={props.logout} className={s.hide_item}>
                  Выйти
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
};

export default Header;
