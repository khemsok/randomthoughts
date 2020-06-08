const { firebase } = require("../../util/admin");

export default (req, res) => {
  if (req.method === "POST") {
    if (req.body.email.trim() === "" || req.body.password.trim() === "") {
      return res
        .status(400)
        .json({ message: "Username/password must not be empty" });
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password)
      .then((response) => {
        console.log(response);
        return res.json({ message: "success" });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }
};
