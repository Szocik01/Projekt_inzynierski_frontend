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
import resolveLastWordColor from "../utils/ResolveLastWordColor";
import {
  authPanelStyles,
  customSingleColumnStyles,
  formStyles,
  headerStyles,
  descriptionPanelStyles,
  httpErrorStyles,
  redirectionSectionStyles
} from "../components/AuthComponents/AuthGlobalStyles";
import { baseButtonStyles } from "../GlobalStyles";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });
  const [httpError, setHttpError] = useState("");

  const [sendRegisterData, isLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/auth/register`
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

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ) => {
    if (confirmPassword.trim().length < 8) {
      return "Hasło powinno zawierać przynajmniej 8 znaków.";
    }

    if (confirmPassword !== password) {
      return "Podane hasła się róźnią";
    }
  };

  const validateUserName = (userName: string) => {
    if (userName.trim().length < 6) {
      return "Hasło powinno zawierać przynajmniej 8 znaków.";
    }
    if(userName.trim().length > 12){
      return "Hasło powinno zawierać maksymalnie 12 znaków.";
    }
    return "";
  };

  const emailError = validateEmail(registerData.email);
  const passwordError = validatePassword(registerData.password);
  const confirmPasswordError = validateConfirmPassword(
    registerData.confirmPassword,
    registerData.password
  );
  const userNameError = validateUserName(registerData.userName);

  const handleResponse = (response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setSingleCookie("token", data.token.access_token);
      setSingleCookie("userId", data.user.id);

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

  const registerHandler = (event: FormEvent) => {
    event.preventDefault();
    setHttpError("");
    if (
      !!emailError ||
      !!passwordError ||
      !!confirmPasswordError ||
      !!userNameError
    ) {
      return;
    }

    const body = {
      email: registerData.email,
      password: registerData.password,
      username: registerData.userName,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    sendRegisterData(handleResponse, handleError, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
  };

  return (
    <SingleColumn customCss={customSingleColumnStyles}>
      <div css={authPanelStyles}>
        <form css={formStyles} onSubmit={registerHandler}>
        {isLoading && <ContentLoading coverParent={true} blurOverlay={true}/>}
        <h1 css={headerStyles}>
            {resolveLastWordColor("Zarejestruj się na Konto")}
        </h1>
          <AuthFormInputs
            values={registerData}
            valueErrors={{
              email: emailError,
              password: passwordError,
              confirmPassword: confirmPasswordError,
              userName: userNameError,
            }}
            onChange={(event) => {
              const targetElementName = event.target.name;
              setRegisterData((prevValue) => {
                return {
                  ...prevValue,
                  ...{
                    [targetElementName]: event.target.value,
                  },
                };
              });
            }}
          />
          <div css={httpErrorStyles}>{httpError ? httpError : ""}</div>
          <Button
            variant="contained"
            disabled={
              !!emailError ||
              !!passwordError ||
              !!confirmPasswordError ||
              !!userNameError
            }
            type="submit"
            sx={[baseButtonStyles,{textTransform:"uppercase"}]}
          >
            Zarejestruj
          </Button>
          <span css={redirectionSectionStyles}>
            Posiadasz już konto?{" "}
            <Link to="/login">Zaloguj się</Link>
          </span>
        </form>
        <div css={descriptionPanelStyles}>
          <h2>
            Witaj Quizowiczu!
          </h2>
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
        </div>
      </div>
    </SingleColumn>
  );
};

export default Register;
