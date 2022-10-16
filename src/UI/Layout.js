import { Fragment } from "react";
import NavBar from "./NavBar";

function Layout(props) {
  return (
    <Fragment>
      <NavBar />
      <div>{props.children}</div>
    </Fragment>
  );
}

export default Layout;
