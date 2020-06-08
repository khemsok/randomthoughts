import React, { useState } from "react";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function SignUp() {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };
    console.log(JSON.stringify(body), "----");
    fetch(new URL("/api/signup", document.baseURI), {
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
        <TextField
          type="password"
          label="Confirm Password"
          value={state.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default SignUp;
