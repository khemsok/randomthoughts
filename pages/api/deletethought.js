const { db, admin } = require("../../util/admin");
import authenticated from "../../util/authenticated";

export default authenticated((req, res) => {
  console.log(req.body.thoughtId, "sdafsadfsdaf");

  if (req.method === "DELETE") {
    const document = db.doc(`/thoughts/${req.body.thoughtId}`);
    document
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ message: "Thought not found" });
        }
        if (doc.data().userId !== req.userId) {
          return res.status(403).json({ message: "Unauthorized" });
        } else {
          return document.delete();
        }
      })
      .then(() => {
        res.json({ message: "Thought deleted successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.code });
      });
  }
});
