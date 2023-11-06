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

const registerPanelStyles = css({
  position: "relative",
});

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
    if (response.status >= 500) {
      throw new Error("Wystąpił wewnętrzny błąd serwera.");
    }
    if (response.status >= 400 && response.status <= 499) {
      throw new Error("Niepoprawny login lub hasło");
    }
    return response.json().then((data) => {
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
    <SingleColumn>
      <div css={registerPanelStyles}>
        {isLoading && <ContentLoading coverParent={true} />}
        <form onSubmit={registerHandler}>
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
          <div>{httpError ? httpError : ""}</div>
          <Button
            variant="contained"
            disabled={
              !!emailError ||
              !!passwordError ||
              !!confirmPasswordError ||
              !!userNameError
            }
            type="submit"
          >
            Zarejestruj
          </Button>
        </form>
        <div></div>
      </div>
    </SingleColumn>
  );
};

export default Register;
