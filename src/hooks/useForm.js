import { useState } from "react";

export default function useForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let userNameError = "";
    let passwordError = "";
    let emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    let passwordRegex = new RegExp(/(?=.*[A-Z])/);
    if (userName) {
      if (!(userName.length >= 5)) {
        userNameError = "Username should be atleast 5 characters";
      }
      if (!emailRegex.test(userName)) {
        userNameError = "Not a valid email";
      }
    } else {
      userNameError = "Username is required";
    }
    if (password) {
      if (!(password.length >= 6)) {
        passwordError = "Password should be atleast 6 characters";
      }
      if (!passwordRegex.test(password)) {
        passwordError = "Password should contain one uppercase";
      }
    } else {
      passwordError = "Password is required";
    }
    setUserNameError(userNameError);
    setPasswordError(passwordError);
    if (userNameError || passwordError) {
      return false;
    }
    return true;
  };

  return [
    userName,
    setUserName,
    password,
    setPassword,
    userNameError,
    passwordError,
    validate
  ];
}
