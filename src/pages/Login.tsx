/** @jsxImportSource @emotion/react */
import { FormEvent, useState } from "react";
import SingleColumn from "../components/LayoutComponents/SingleColumn";
import AuthFormInputs from "../components/AuthComponents/AuthFormInputs";
import { Button } from "@mui/material";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../storage/authSlice";
import ContentLoading from "../components/UtilityComponents/ContentLoading";
import { css } from "@emotion/react";
import setSingleCookie from "../utils/SetSingleCookie";

const loginPanelStyles = css({
  position: "relative",
});

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [httpError, setHttpError] = useState("");

  const [sendLoginData, isLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/auth/login`
  );

  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    if (email.trim().length === 0) {
      return "Proszę podać email.";
    }
    if (!email.includes("@") || !email.includes(".")) {
      return "Proszę podać poprawny format maila.";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (password === undefined) {
      return "";
    }
    if (password.trim().length < 8) {
      return "Hasło powinno zawierać przynajmniej 8 znaków.";
    }
    return "";
  };

  const handleResponse = (response: Response) => {
    if (response.status >= 500) {
      throw new Error("Wystąpił wewnętrzny błąd serwera.");
    }
    if (response.status >= 400 && response.status <= 499) {
      throw new Error("Podano niepoprawne dane");
    }
    return response.json().then((data) => {
      setSingleCookie(
        "token",
        data.token.access_token,
        loginData.rememberMe ? new Date(data.token.token_expire) : undefined
      );
      setSingleCookie(
        "userId",
        data.user.id,
        loginData.rememberMe ? new Date(data.token.token_expire) : undefined
      );

      dispatch(
        authSliceActions.addUserData({
          token: data.token.access_token,
          userId: data.user.id,
        })
      );
    });
  };

  const handleError = (error: Error) => {
    setHttpError(error.message);
  };

  const loginHandler = (event: FormEvent) => {
    event.preventDefault();
    setHttpError("");
    if (!!emailError || !!passwordError) {
      return;
    }

    const body = {
      email: loginData.email,
      password: loginData.password,
      remember_me: loginData.rememberMe,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    sendLoginData(handleResponse, handleError, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
  };

  const emailError = validateEmail(loginData.email);
  const passwordError = validatePassword(loginData.password);

  return (
    <SingleColumn>
      <div css={loginPanelStyles}>
        {isLoading && <ContentLoading coverParent={true} />}
        <form onSubmit={loginHandler}>
          <AuthFormInputs
            values={loginData}
            valueErrors={{
              email: emailError,
              password: passwordError,
            }}
            onChange={(event) => {
              const targetElementName = event.target.name;
              setLoginData((prevValue) => {
                return {
                  ...prevValue,
                  ...{
                    [targetElementName]:
                      targetElementName !== "rememberMe"
                        ? event.target.value
                        : event.target.checked,
                  },
                };
              });
            }}
          />
          <div>{httpError ? httpError : ""}</div>
          <Button
            variant="contained"
            disabled={!!emailError || !!passwordError}
            type="submit"
          >
            Zaloguj
          </Button>
        </form>
        <div></div>
      </div>
    </SingleColumn>
  );
};

export default Login;
