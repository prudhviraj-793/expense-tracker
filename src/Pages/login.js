import { Fragment, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Api/api";
import Context from "../Context/Context";

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const ctx = useContext(Context)
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
    ctx.addUserId(enteredEmail)
    ctx.addToken(token)
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
        <p>Don't have an account? Sign Up</p>
      </div>
    </Fragment>
  );
}

export default Login;
