import axios from "axios";
import { refreshToken } from "../store/authSlice";

const services = {};

let instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor для автоматического добавления токена и обновления при необходимости
instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

services.usersAPI = {
  getUsers() {
    return instance.get(`profile/users`).then((response) => response.data);
  },
};

services.profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`).then((response) => response.data);
  },
  updateProfile(update) {
    return instance
      .patch(`profile/`, { ...update })
      .then((response) => response.data);
  },
  updatePhoto(photo, id) {
    return instance
      .post(`profile/${id}/photo`, photo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
};

services.authAPI = {
  authMe() {
    return instance.get(`auth/authMe`).then((response) => response.data);
  },
  logIn(email, password, rememberMe = false) {
    return instance
      .post(`auth/login`, { email, password })
      .then((responce) => responce.data);
  },
  reg(email, password, username) {
    return instance
      .post(`auth/register`, { email, password, username })
      .then((responce) => responce.data);
  },
  logOut() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
  refreshToken(refreshToken) {
    return instance
      .post(`auth/refresh-token`, { refreshToken })
      .then((res) => res.data);
  },
};

services.chatsAPI = {
  getChats() {
    return instance.get(`chats/`).then((response) => response.data);
  },
  createChat(user1, user2) {
    return instance
      .post(`chats/`, { user1, user2 })
      .then((response) => response.data);
  },
  getMessages(id) {
    return instance.get(`chats/${id}`).then((res) => res.data);
  },
  getUnread() {
    return instance.get(`chats/unreadCount`).then((res) => {
      return res.data;
    });
  },
};

export default services;
