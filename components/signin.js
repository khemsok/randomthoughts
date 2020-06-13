import React from "react";
import { UserContext } from "./userContext";
import firebase from "../util/firebase";

// MUI
import Button from "@material-ui/core/Button";

import Router from "next/router";

function SignIn() {
  const googleAuthPopUp = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then((idToken) => {
            fetch(new URL("/api/auth", document.baseURI), {
              headers: {
                Authorization: `${idToken}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                Router.reload("/");
              })
              .catch((err) => console.error(err));
          });
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode);
        // ...
      });
  };

  return (
    <>
      <Button
        variant="outlined"
        size="large"
        style={{
          color: "#757575",
          textTransform: "none",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 2px 4px 0px",
          border: "none",
          height: "60px",
          width: "250px",
          display: "block",
          margin: "0 auto",
        }}
        onClick={googleAuthPopUp}
      >
        <img
          src="/google_icon.svg"
          style={{
            width: "20px",
            marginRight: "15px",
            verticalAlign: "middle",
          }}
        />
        Sign in with Google
      </Button>
    </>
  );
}

export default SignIn;
