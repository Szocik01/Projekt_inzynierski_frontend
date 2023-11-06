import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { ReduxAppState } from "./storage/redux";
import PageNotFound from "./pages/PageNotFound";
import { AuthSliceState, authSliceActions } from "./storage/authSlice";
import { useLayoutEffect } from "react";

const App = () => {
  const { token, userId } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const cookiesArray = document.cookie.split(";");
    let authData: AuthSliceState = {
      token: "",
      userId: "",
    };
    for (const cookie of cookiesArray) {
      const splittedCookie = cookie.split("=");
      if (splittedCookie[0].trim() === "token") {
        authData.token = splittedCookie[1];
      }
      if (splittedCookie[0].trim() === "userId") {
        authData.userId = splittedCookie[1];
      }
    }
    dispatch(authSliceActions.addUserData(authData));
  }, [dispatch]);

  return (
    <Routes>
      {token && userId ? (
        <Route path="/register" element={<Navigate to="/" replace={true} />} />
      ) : (
        <Route path="/register" element={<Register />} />
      )}
      {token && userId ? (
        <Route path="/login" element={<Navigate to={"/"} replace={true} />} />
      ) : (
        <Route path="/login" element={<Login />} />
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
