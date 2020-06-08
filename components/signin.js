import React, { useState } from "react";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function SignIn() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: state.email,
      password: state.password,
    };
    console.log(JSON.stringify(body), "----");
    fetch(new URL("/api/signin", document.baseURI), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={state.email}
          onChange={handleChange}
          name="email"
        />
        <TextField
          type="password"
          label="Password"
          value={state.password}
          onChange={handleChange}
          name="password"
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default SignIn;
