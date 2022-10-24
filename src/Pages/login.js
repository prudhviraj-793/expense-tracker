import { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Api/api";
import { authActions } from "../store/authSlice";

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const dispacth = useDispatch()
  const navigate = useNavigate()

  async function loginHandler(e) {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const user = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    const token = await login(user)
    dispacth(authActions.addToken(token))
    dispacth(authActions.addUserId(enteredEmail))
    dispacth(authActions.isAuthenticated(true))
    // ctx.addUserId(enteredEmail)
    // ctx.addToken(token)
    localStorage.setItem(enteredEmail, token)
    navigate('/welcome')
  }

  return (
    <Fragment>
      <div>
        <h3>Login</h3>
      </div>
      <form onSubmit={loginHandler}>
        <input type="email" ref={emailRef} placeholder="Email" required />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />
        <div>
          <button type="submit">Login</button>
          <Link to='/resetPassword' >Forgot Password</Link>
        </div>
      </form>
      <div>
        <Link to='/' >Don't have an account? Sign Up</Link>
      </div>
    </Fragment>
  );
}

export default Login;
