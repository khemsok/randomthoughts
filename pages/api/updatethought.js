const { db, admin } = require("../../util/admin");
import authenticated from "../../util/authenticated";

export default authenticated((req, res) => {
  if (req.method === "PUT") {
    const document = db.doc(`/thoughts/${req.body.thoughtId}`);
    document
      .update({ thought: req.body.thought })
      .then((response) => res.json({ message: "Thought updated successfully" }))
      .catch((err) => res.status(500).json({ message: err.code }));
  }
});
