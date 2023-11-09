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
import setSingleCookie from "../utils/SetSingleCookie";
import parse from "html-react-parser";
import {
  authPanelStyles,
  customSingleColumnStyles,
  formStyles,
  headerStyles,
  descriptionPanelStyles,
  buttonStyles,
  httpErrorStyles,
} from "../components/AuthComponents/AuthGlobalStyles";
import { Link } from "react-router-dom";

function resolveLastWordColor(text: string) {
  const splittedString = text.split(" ");
  splittedString[splittedString.length - 1] = `<span>${
    splittedString[splittedString.length - 1]
  }</span>`;
  return parse(splittedString.join(" "));
}

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
    // if (response.status >= 500) {
    //   throw new Error("Wystąpił wewnętrzny błąd serwera.");
    // }
    // if (response.status >= 400 && response.status <= 499) {
    //   throw new Error("Podano niepoprawne dane");
    // }
    return response.json().then((data) => {
      setHttpError(`${data.message}, ${data.status}, ${data.server_message}`)
      // setSingleCookie(
      //   "token",
      //   data.token.access_token,
      //   loginData.rememberMe ? new Date(data.token.token_expire) : undefined
      // );
      // setSingleCookie(
      //   "userId",
      //   data.user.id,
      //   loginData.rememberMe ? new Date(data.token.token_expire) : undefined
      // );

      // dispatch(
      //   authSliceActions.addUserData({
      //     token: data.token.access_token,
      //     userId: data.user.id,
      //   })
      // );
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
    <SingleColumn customCss={customSingleColumnStyles}>
      <div css={authPanelStyles}>
        <form onSubmit={loginHandler} css={formStyles}>
          {isLoading && <ContentLoading coverParent={true} />}
          <h1 css={headerStyles}>
            {resolveLastWordColor("Zaloguj się na Konto")}
          </h1>
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
          <div css={httpErrorStyles}>{httpError ? httpError : ""}</div>
          <Button
            variant="contained"
            disabled={!!emailError || !!passwordError}
            type="submit"
            sx={buttonStyles}
          >
            Zaloguj
          </Button>
        </form>
        <div css={descriptionPanelStyles}>
          <h2>Witaj Quizowiczu!</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s , when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <Link to="/register">
            <Button
              sx={buttonStyles}
              variant="contained"
              role="link"
              type="button"
            >
              Zarejestruj się
            </Button>
          </Link>
        </div>
      </div>
    </SingleColumn>
  );
};

export default Login;
