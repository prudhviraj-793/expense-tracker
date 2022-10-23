import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import Profile from "./Pages/profile";
import ResetPassword from "./Pages/resetPassword";
import SignUp from "./Pages/signup";
import Welcome from "./Pages/welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/welcome" element={<Welcome />}>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/resetPassword" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
