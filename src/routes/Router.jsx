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
            <Route path="/" component={Home} />
            <Route path="/task/new" component={NewTask} />
            <Route path="/list/new" component={NewList} />
            <Route path="/lists/:listId/tasks/:taskId" component={EditTask} />
            <Route path="/lists/:listId/edit" component={EditList} />
          </>
        ) : (
          // <Redirect to="/signin" />
          <Navigate replace to="/signin" />
        )}
        <Route component={NotFound} />
        {/* </Switch> */}
      </Routes>
    </BrowserRouter>
  );
};
