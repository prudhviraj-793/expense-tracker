import { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateProfile } from "../store/actions";
import { profileActions } from "../store/profileSlice";

function Profile() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const photoUrlRef = useRef();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const dispacth = useDispatch();
  const displayName = useSelector(state => state.profile.displayName)
  const photoUrl = useSelector(state => state.profile.photoUrl)

  useEffect(() => {
    async function fetchProfile() {
      const response = await getUserProfile(token, userId)
      dispacth(profileActions.updateProfile(response))
    }
    fetchProfile()
  }, [token, userId, dispacth])

  function cancelHandler(e) {
    e.preventDefault();
    navigate("/welcome");
  }

  function updateProfileHandler(e) {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUrl = photoUrlRef.current.value;
    const userProfile = {
      idToken: token,
      displayName: enteredName,
      photoUrl: enteredUrl,
    };
    dispacth(
      profileActions.updateProfile({
        displayName: enteredName,
        photoUrl: enteredUrl,
      })
    );
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
            defaultValue={displayName}
            required
          />
          <label>Profile Photo URL :</label>
          <input
            type="text"
            ref={photoUrlRef}
            defaultValue={photoUrl}
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
