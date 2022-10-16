import { Fragment, useRef } from "react";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory()

  async function login(mail, psswd) {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: mail,
          password: psswd,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('please check')
      }
      const data = await response.json();
      localStorage.setItem(mail, data.idToken)
      history.push('/welcome')
    } catch(error) {
        alert(error)
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    login(enteredEmail, enteredPassword);
    emailRef.current.value = ''
    passwordRef.current.value = ''
  }

  return (
    <Fragment>
      <form onSubmit={submitHandler} className="form">
        <div className="header">Login</div>
        <div className="input">
          <input type="email" ref={emailRef} placeholder="Email" required />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
        </div>
        <div className="btn">
          <button type="submit">Login</button>
        </div>
        <div className="header">
          <p>Forgot Password</p>
        </div>
      </form>
      <div className="header">
        <p>Dont't have an account? Sign Up</p>
      </div>
    </Fragment>
  );
}

export default LoginPage;
