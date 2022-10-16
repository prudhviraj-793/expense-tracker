import { Fragment, useRef } from "react";
import "./Update.css";

function Update() {
  const nameRef = useRef();
  const photoRef = useRef();

  async function update(name, photoUrl) {
    const token = localStorage.getItem('user@mail.com')
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAYgqSYR1Ydu_Vv2OHuBMFhaAfTFQK3gic";
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: photoUrl
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json()
    console.log(data)
  }

  function updateHandler(e) {
    e.preventDefault();
    const enteredName = nameRef.current.value
    const enteredUrl = photoRef.current.value
    update(enteredName, enteredUrl)
    nameRef.current.value = ''
    photoRef.current.value = ''
  }
  return (
    <Fragment>
      <div className="header">
        <h3>Contact Details</h3>
        <button>Cancel</button>
      </div>
      <form>
        <label>Full Name: </label>
        <input type="text" ref={nameRef} />
        <label>Profile Photo url</label>
        <input type="text" ref={photoRef} />
      </form>
      <button onClick={updateHandler}>Update</button>
    </Fragment>
  );
}

export default Update;
