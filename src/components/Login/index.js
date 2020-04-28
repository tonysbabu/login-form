import React from "react";
import useLogin from "../../hooks/useLogin";
import useForm from "../../hooks/useForm";
import LoadingIndicator from "../LoadingIndicator";

export default function Login() {
  const [login, loading] = useLogin();
  const [
    userName,
    setUserName,
    password,
    setPassword,
    userNameError,
    passwordError,
    validate
  ] = useForm();

  const handleSubmit = async () => {
    let valid = validate();
    if (valid) {
      const url = "http://www.mocky.io/v2/5d9d9219310000153650e30b";
      try {
        await login(url);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login-container">
      {loading && <LoadingIndicator />}
      <div className="login-form-container">
        <div>
          <h3> HealthifyMe </h3>
        </div>
        <div>
          <h2> Sign in </h2>
        </div>
        <div>
          <h4> Use your healthify me account </h4>
        </div>
        <div className="form-container">
          <div className="form-field">
            <input
              placeholder="Username"
              value={userName}
              className={userNameError && "field-error"}
              onChange={e => setUserName(e.target.value)}
            />
            <div className="form-error">{userNameError}</div>
          </div>
          <div className="form-field">
            <input
              type="Password"
              placeholder="Password"
              value={password}
              className={passwordError && "field-error"}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="form-error">{passwordError}</div>
          </div>
          <div className="btn-container">
            <button onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
