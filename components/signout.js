import { useContext } from "react";
import { UserContext } from "./userContext";
import firebase from "../util/firebase";
import Cookies from "js-cookie";
import Router from "next/router";

// MUI
import Button from "@material-ui/core/Button";

function SignOut() {
  const { user, setUser } = useContext(UserContext);
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        Cookies.remove("authToken");
        Router.reload("/");
      })
      .catch(function (error) {
        console.log("something wrong happen");
        // An error happened.
      });
  };
  return (
    <Button
      style={{ margin: "10px 0", float: "right" }}
      size="large"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}

export default SignOut;
