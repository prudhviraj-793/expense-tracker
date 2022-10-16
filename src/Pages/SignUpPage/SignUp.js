import { Fragment, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory()

  async function signUp(mail, psswd) {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
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
    const data = await response.json();
    console.log(data.idToken);
  }

  function submitHandler(e) {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword === enteredConfirmPassword) {
      signUp(enteredEmail, enteredPassword);
      history.push('/login')
      emailRef.current.value = "";
    } else {
      alert("please re-renter password");
    }
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  }

  return (
    <Fragment>
      <form onSubmit={submitHandler} className="form">
        <div className="header">SignUp</div>
        <div className="input">
          <input type="email" ref={emailRef} placeholder="Email" required />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
          <input
            type="password"
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="btn">
          <button type="submit">Sign Up</button>
        </div>
        <div className="header">
          <p>Have an account? Login</p>
        </div>
      </form>
    </Fragment>
  );
}

export default SignUpPage;
