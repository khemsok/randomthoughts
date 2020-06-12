const { admin } = require("../../util/admin");
const cookie = require("cookie");

export default (req, res) => {
  if (req.method === "GET") {
    if (req.headers.authorization) {
      checkAuth(req.headers.authorization, res);
    } else if (req.cookies.authToken) {
      checkAuth(req.cookies.authToken, res);
    } else {
      res.status(500).json({ message: "You are not authenticated" });
    }
  }
};

const checkAuth = (idToken, res) => {
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      let uid = decodedToken.uid;
      console.log(decodedToken);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("authToken", idToken, {
          // httpOnly: true,
          // secure: process.env.NODE_ENV !== "development",
          // sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );
      res.status(200).json({ message: "Hey it works!" });
    })
    .catch((err) => console.error(err));
};
