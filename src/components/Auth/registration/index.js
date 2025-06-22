import React, { useState } from "react";
import s from "./style.module.css";
import AuthInput from "../../common/input";
import card from "../../../assets/image 21.png";
import google from "../../../assets/google.png";
import apple from "../../../assets/devicon_apple.png";
const Registration = (props) => {
  const [data, setData] = useState({ login: "", password: "", name: "" });
  const [step, setStep] = useState(1);

  const getInputByStep = () => {
    switch (step) {
      case 1:
        return (
          <AuthInput
            value={data.login}
            ph="email@gmail.com"
            onChange={(e) => setData({ ...data, login: e.target.value })}
            label={"Электронная почта"}
          />
        );
      case 2:
        return (
          <AuthInput
            value={data.password}
            ph="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            label={"Пароль"}
          />
        );
      case 3:
        return (
          <AuthInput
            value={data.name}
            ph="Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            label={"Имя"}
          />
        );
      default:
        return (
          <AuthInput
            value={data.login}
            ph="email@gmail.com"
            onChange={(e) => setData({ ...data, login: e.target.value })}
            label={"Электронная почта"}
          />
        );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.reg(data);
      }}
      className={s.wrap}
    >
      <div className={s.container}>
        <div className={s.rigth}>
          <div className={s.logo}>StarLine</div>
          <h1 className={s.title}>Создай свой аккаунт</h1>
          <AuthInput
            value={data.login}
            ph="email@gmail.com"
            onChange={(e) => setData({ ...data, login: e.target.value })}
            label={"Электронная почта"}
          />
          <AuthInput
            value={data.name}
            ph="Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            label={"Имя"}
          />
          <AuthInput
            value={data.password}
            ph="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            label={"Пароль"}
          />
          <div className={s.btn_block}>
            <button
              style={{ marginBottom: 50 }}
              type={"submit"}
              className={s.btn}
            >
              {"Зарегистрироваться"}
            </button>
          </div>

          <div className={s.reg} onClick={() => props.toAuth()}>
            Уже есть аккаунт? <span>Войдите в него</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Registration;
