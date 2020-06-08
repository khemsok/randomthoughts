const { firebase } = require("../../util/admin");

export default (req, res) => {
  if (req.method === "POST") {
    if (req.body.email.trim() === "" || req.body.password.trim() === "") {
      return res
        .status(400)
        .json({ message: "Username/password must not be empty" });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password is not the same" });
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then((response) => {
        console.log(response);
        return res.json({ message: "success" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ err });
      });
  }
};
