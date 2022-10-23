import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../Api/api";

function SignUp() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate()

  function signUpHandler(e) {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword === enteredConfirmPassword) {
      const user = {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      };
      signup(user)
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      navigate('/login')
    } else {
      alert("Please re-enter password");
    }
  }

  return (
    <Fragment>
      <div>
        <h3>Sign Up</h3>
      </div>
      <form onSubmit={signUpHandler}>
        <input type="email" ref={emailRef} placeholder="Email" required />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Enter-Password"
          required
        />
        <input
          type="password"
          ref={confirmPasswordRef}
          placeholder="Confirm-Password"
          required
        />
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div>
        <p>Have an account? Login</p>
      </div>
    </Fragment>
  );
}

export default SignUp;
