import React, { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Header from "./header";

import { useNavigate, useSearchParams } from "react-router";

import { logout } from "../../../store/authSlice";

const HeaderContainer = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    profile: state.auth.profile,

    myId: state.auth.myId,
  }));

  const callbacks = {
    toAuth: useCallback(() => navigate("/auth")),
    toProfile: useCallback(() => navigate(`/profile/${select.myId}`)),

    logout: useCallback(() => dispatch(logout()), []),
  };

  return (
    <>
      <Header
        profile={select.profile}
        isAuth={select.isAuth}
        toAuth={callbacks.toAuth}
        toProfile={callbacks.toProfile}
        logout={callbacks.logout}
      />
    </>
  );
};

export default HeaderContainer;
