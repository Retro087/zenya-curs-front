import { configureStore } from "@reduxjs/toolkit";

import profileSlice from "./profileSlice";

import authSlice from "./authSlice";
import initSlice from "./initializeSlice";

import chatSlice from "./chatSlice";
import chatsSlice from "./chatsSlice";
import usersSlice from "./usersSlice";

export default configureStore({
  reducer: {
    profile: profileSlice,

    auth: authSlice,
    init: initSlice,

    chat: chatSlice,
    chats: chatsSlice,
    users: usersSlice,
  },
});
