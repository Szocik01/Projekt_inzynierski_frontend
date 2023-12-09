/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Backdrop } from "@mui/material";
import { mediaUp } from "../../utils/mediaQueries";
import useHttp from "../../hooks/useHttp";
import { API_CALL_URL_BASE } from "../../utils/Constants";
import deleteSingleCookie from "../../utils/DeleteSingleCookie";
import { ReduxAppState } from "../../storage/redux";
import { AuthSliceState, authSliceActions } from "../../storage/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ContentLoading from "../UtilityComponents/ContentLoading";
import { PageEventsSliceState } from "../../storage/pageEventsSlice";

const headerStyles = css({
  position: "fixed",
  zIndex: 1000,
  left: 0,
  top: 0,
  width: "100%",
  height: "4.5rem",
});

const Navigation = () => {
  const [isUnfolded, setUnfolded] = useState(false);

  const [logoutRequest, isLoggingOut] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/auth/logout`
  );

  const { token, userId } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  const { isScrolled } = useSelector<ReduxAppState, PageEventsSliceState>(
    (state) => {
      return state.pageEvents;
    }
  );

    const dispatch = useDispatch();

  function togglerClickHandler() {
    setUnfolded((prevValue) => {
      return !prevValue;
    });
  }

  function handleLogoutResponse(response: Response) {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
    });
  }

  function handleLogoutError(error: Error) {
    console.warn(error.message);
  }

  function logoutHandler() {
    deleteSingleCookie("token");
    deleteSingleCookie("rememberMe");
    deleteSingleCookie("userId");
    dispatch(authSliceActions.deleteUserData())
    logoutRequest(handleLogoutResponse, handleLogoutError, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return (
    <>
    {isLoggingOut && <ContentLoading blurOverlay={true}/>}
      <Backdrop
        open={isUnfolded}
        onClick={togglerClickHandler}
        sx={{
          zIndex: 500,
          [mediaUp("md")]: {
            display: "none",
          },
        }}
      />
      <header css={[headerStyles]}>
        <Navbar
          isUnfolded={isUnfolded}
          isScrolled={isScrolled}
          onTogglerClick={togglerClickHandler}
          userId={userId}
          token={token}
          onLogout={logoutHandler}
        />
        <Sidebar
          isUnfolded={isUnfolded}
          isScrolled={isScrolled}
          onLogout={logoutHandler}
          userId={userId}
          token={token}
        />
      </header>
    </>
  );
};

export default Navigation;
