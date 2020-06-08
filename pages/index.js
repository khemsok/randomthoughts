// Components
import Landing from "../components/landing";
import SignIn from "../components/signin";
import SignUp from "../components/signup";

// MUI
import Container from "@material-ui/core/Container";

export default function Home() {
  return (
    <Container maxWidth="md">
      <SignUp />
      <SignIn />
      <Landing />
    </Container>
  );
}
