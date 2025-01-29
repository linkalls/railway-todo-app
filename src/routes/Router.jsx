import React from "react";
import { useSelector } from "react-redux";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { EditList } from "../pages/EditList";
import { EditTask } from "../pages/EditTask";
import { Home } from "../pages/Home";
import { NewList } from "../pages/NewList";
import { NewTask } from "../pages/NewTask";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      {/* <Switch> */}
      <Routes>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        {auth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/task/new" element={<NewTask />} />
            <Route path="/list/new" element={<NewList />} />
            <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
            <Route path="/lists/:listId/edit" element={<EditList />} />
          </>
        ) : (
          // <Redirect to="/signin" />
          <Navigate replace to="/signin" />
        )}
        <Route element={<NotFound />} />
        {/* </Switch> */}
      </Routes>
    </BrowserRouter>
  );
};
