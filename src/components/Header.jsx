import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux/es/exports";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import "./header.css";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigator = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    // history.push("/signin");
    navigator("/signin");
  };

  return (
    <header className="header">
      <h1>Todoアプリ</h1>
      {auth ? (
        <button onClick={handleSignOut} className="sign-out-button">
          サインアウト
        </button>
      ) : (
        <></>
      )}
    </header>
  );
};
