import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { ReduxAppState } from "./storage/redux";
import PageNotFound from "./pages/PageNotFound";
import { AuthSliceState, authSliceActions } from "./storage/authSlice";
import { useLayoutEffect, useState } from "react";
import { Global } from "@emotion/react";
import useHttp from "./hooks/useHttp";
import { API_CALL_URL_BASE } from "./utils/Constants";
import setSingleCookie from "./utils/SetSingleCookie";
import ContentLoading from "./components/UtilityComponents/ContentLoading";

const App = () => {
  const { token, userId } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  const [isLoading, setLoading] = useState(true);
  const [refreshToken] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/auth/refresh_token`,
    true
  );

  const dispatch = useDispatch();

  const handleResponse = (response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setSingleCookie("token", data.access_token, data.token_expire);
      setSingleCookie("userId", data.id, data.token_expire);
      setSingleCookie("rememberMe", "1", data.token_expire);
      dispatch(authSliceActions.addUserData({
        token: data.access_token,
        userId: data.id,
      }))
      setLoading(false);
    });
  };

  const handleError = (error: Error) => {
    console.warn(error.message);
    setLoading(false);
  };

  useLayoutEffect(() => {
    const cookiesArray = document.cookie.split(";");
    let authData: AuthSliceState = {
      token: "",
      userId: "",
    };
    for (const cookie of cookiesArray) {
      const splittedCookie = cookie.split("=");
      if (
        splittedCookie[0].trim() === "rememberMe" &&
        +splittedCookie[1].trim() !== 1
      ) {
        setLoading(false);
        return;
      }
      if (splittedCookie[0].trim() === "token") {
        authData.token = splittedCookie[1].trim();
      }
      if (splittedCookie[0].trim() === "userId") {
        authData.userId = splittedCookie[1].trim();
      }
    }
    if (authData.token === "" || authData.userId === "") {
      setLoading(false);
      return;
    }
    refreshToken(handleResponse, handleError, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
    });
  }, [dispatch]);

  return (
    <>
      <Global
        styles={{
          "*": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
          },
          body: {
            overflowX: "hidden",
            fontFamily: "'Secular One', sans-serif",
            background:
              "url('/images/backgrounds/page-background.svg'), linear-gradient(180deg, #3EF83E 40.44%, #242424 133.14%);",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            padding: "5rem 0 1rem 0",
          },
        }}
      />
      {isLoading && <ContentLoading blurOverlay={true}/>}
      <Routes>
        {token && userId ? (
          <Route
            path="/register"
            element={<Navigate to="/" replace={true} />}
          />
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
    </>
  );
};

export default App;
