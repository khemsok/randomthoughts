import { useEffect, useState } from "react";

import Router from "next/router";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

// Components
import Landing from "../components/landing";
import SignIn from "../components/signin";
import Footer from "../components/footer";
import { UserContext } from "../components/userContext";

// MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function Home({ auth, resp }) {
  const [user, setUser] = useState(auth ? auth : null);

  // useEffect(() => {
  //   setUser(auth);
  // });

  return (
    <Container maxWidth="md">
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          paddingBottom: "130px",
        }}
      >
        <Typography variant="h2" align="center" style={{ padding: "40px 0" }}>
          Random Thoughts 🤔
        </Typography>
        <UserContext.Provider value={{ user, setUser }}>
          {user ? <Landing /> : <SignIn />}
        </UserContext.Provider>
        <Footer />
      </div>
    </Container>
  );
}

Home.getInitialProps = async (ctx) => {
  const server =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000"
      : "https://randomthoughts-nu.now.sh/";

  if (ctx.req.headers.cookie) {
    const resp = await fetch(`${server}/api/auth`, {
      headers: {
        cookie: ctx.req.headers.cookie,
      },
    });
    if (resp.status === 200) {
      return { auth: true, resp: resp };
    } else {
      return { auth: false, resp: resp };
    }
  } else {
    return { auth: false, resp: "hello" };
  }
};
