import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

import ProfilePersonal from "./profile-personal";
import ContainerLayout from "../../layouts/container-layout";

import { getProfile, updateProfile } from "../../store/profileSlice";
import BlockTitle from "../common/block-title";
import Button from "../common/Button";

const ProfileContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    profile: state.profile.profile,
    role: state.auth.role,
    myId: state.auth.myId,
  }));

  const callbacks = {
    update: useCallback((update) => dispatch(updateProfile(update)), []),
  };

  useEffect(() => {
    dispatch(getProfile(params.id));
  }, []);

  if (!select.profile) {
    return <div>'не найдено'</div>;
  }

  return (
    <div>
      <ContainerLayout alignItems="start" width={1140}>
        {params.id === select.myId ? (
          <ProfilePersonal
            update={callbacks.update}
            title={"Персональные"}
            profile={select.profile}
            myId={select.myId}
          />
        ) : (
          <div style={{ width: "100%" }}>
            <BlockTitle title={`${select.profile.personal.name}`} />
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                padding: 10,
              }}
            >
              Город: {select.profile.personal.city}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                padding: 10,
              }}
            >
              Почта: {select.profile.personal.email}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                padding: 10,
                marginBottom: 25,
              }}
            >
              Телефон: {select.profile.personal.phone}
            </div>
            <Button value={"Написать"} />
          </div>
        )}
      </ContainerLayout>
    </div>
  );
};

export default ProfileContainer;
