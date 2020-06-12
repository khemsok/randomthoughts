import { admin } from "./admin";

const authenticated = (fn) => async (req, res) => {
  if (req.cookies.authToken) {
    const idToken = req.cookies.authToken;
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async (decodedToken) => {
        req.userId = decodedToken.user_id;
        return await fn(req, res);
      })
      .catch((err) => {
        res.status(500).json({ message: "You are not authenticated" });
      });
  } else {
    res.status(500).json({ message: "You are not authenticated" });
  }
};

export default authenticated;
