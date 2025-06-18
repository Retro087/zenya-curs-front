import React, { useState } from "react";
import s from "./style.module.css";
const Input = ({
  label,
  w,
  ph = "",
  onChange,
  value,
  onBlur,
  name,
  type = "text",
}) => {
  const [active, setActive] = useState(false);

  return (
    <div className={s.input_block}>
      <input
        type={type}
        name={name}
        onBlur={(e) => {
          if (onBlur) {
            onBlur(e);
          }

          setActive({ ...active, login: false });
        }}
        style={{ borderColor: active.login ? "#2222" : "#222", width: w }}
        onFocus={() => setActive({ ...active, login: true })}
        className={s.input}
        onChange={(e) => onChange(e)}
        value={value}
        placeholder={ph}
      />
    </div>
  );
};

export default Input;
