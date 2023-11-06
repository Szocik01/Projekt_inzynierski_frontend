/** @jsxImportSource @emotion/react */
import { useState } from "react";
import SingleColumn from "../components/LayoutComponents/SingleColumn";
import AuthFormInputs from "../components/AuthComponents/AuthFormInputs";
import { Button } from "@mui/material";
// import useHttp from "../hooks/useHttp";
// import { API_CALL_URL_BASE } from "../utils/Constants";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  // const [sendRegisterData, isLoading] = useHttp(
  //   `${API_CALL_URL_BASE}/api/routers/http/controllers/auth/register`
  // );

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
    if (userName.trim().length < 8) {
      return "Hasło powinno zawierać przynajmniej 8 znaków.";
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

  return (
    <SingleColumn>
      <div>
        <form>
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
          <Button
            variant="contained"
            disabled={!!emailError || !!passwordError || !!confirmPasswordError || !!userNameError}
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
