import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import { Route, Routes } from "react-router";

import React, { useEffect } from "react";

import AuthContainer from "./components/Auth";
import { initialize } from "./store/initializeSlice";
import WithAuth from "./components/hoc/withAuth";

import Chat from "./app/Chat";

import Profile from "./app/Profile";
import UsersContainer from "./components/Users";

function App() {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    init: state.init.initialized,
  }));
  useEffect(() => {
    dispatch(initialize());
  }, []);

  if (!select.init) {
    return <div>Загрузка</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <WithAuth>
              <Chat />
            </WithAuth>
          }
        />

        <Route path="/auth" element={<AuthContainer />} />
        <Route
          path="/profile/:id?"
          element={
            <WithAuth>
              <Profile />
            </WithAuth>
          }
        />

        <Route
          path="/chats/:id?/:reciever?"
          element={
            <WithAuth>
              <Chat />
            </WithAuth>
          }
        />
        <Route
          path="/users/"
          element={
            <WithAuth>
              <UsersContainer />
            </WithAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
