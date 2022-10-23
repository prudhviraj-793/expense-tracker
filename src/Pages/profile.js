import { Fragment, useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../Api/api";
import Context from "../Context/Context";

function Profile() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const photoUrlRef = useRef();
  const ctx = useContext(Context);
  const token = ctx.token;

  const getUserProfile = useCallback(async (token) => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const user = {
      displayName: data.users[0].displayName,
      photoUrl: data.users[0].photoUrl,
    };
    return user;
  }, []);

  function cancelHandler(e) {
    e.preventDefault();
    navigate("/welcome");
  }

  useEffect(() => {
    async function fetchData() {
      const res = await getUserProfile(token)
      ctx.expenses.push(res)
    }
    fetchData()
  }, [getUserProfile, token, ctx.expenses]);

  function updateProfileHandler(e) {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUrl = photoUrlRef.current.value;
    const userProfile = {
      idToken: token,
      displayName: enteredName,
      photoUrl: enteredUrl,
    };
    updateProfile(userProfile);
  }

  return (
    <Fragment>
      <div>
        <h3>Contact Details</h3>
        <button onClick={cancelHandler}>cancel</button>
      </div>
      <form onSubmit={updateProfileHandler}>
        <div>
          <label>First Name :</label>
          <input
            type="text"
            ref={nameRef}
            defaultValue={ctx.userProfile.displayName}
            required
          />
          <label>Profile Photo URL :</label>
          <input
            type="text"
            ref={photoUrlRef}
            defaultValue={ctx.userProfile.photoUrl}
            required
          />
        </div>
        <div>
          <button type="submit">update</button>
        </div>
      </form>
    </Fragment>
  );
}

export default Profile;
