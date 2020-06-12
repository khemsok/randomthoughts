import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./userContext";
import SignOut from "./signout";
import firebase from "../util/firebase";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Router from "next/router";

function SignIn() {
  const { user, setUser } = useContext(UserContext);

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

        console.log(token);
        console.log(user);
        console.log(result);

        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then((idToken) => {
            console.log(idToken);
            fetch(new URL("/api/auth", document.baseURI), {
              headers: {
                Authorization: `${idToken}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "return from authorization");
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
      <Button onClick={googleAuthPopUp}>Google Auth</Button>
    </>
  );
}

export default SignIn;
