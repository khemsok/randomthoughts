const { db, admin } = require("../../util/admin");
import authenticated from "../../util/authenticated";

export default authenticated((req, res) => {
  //
  if (req.method === "POST") {
    if (req.body.thought.trim() === "") {
      return res.status(400).json({ message: "Thought must not be empty" });
    }
    const newThought = {
      userId: req.userId,
      thought: req.body.thought,
      timestamp: new Date().toISOString(),
    };
    db.collection("thoughts")
      .add(newThought)
      .then((doc) => {
        const resThought = newThought;
        resThought.thoughtId = doc.id;
        return res.json(resThought);
      })
      .catch((err) => {
        return res.status(500).json({ error: "Something went wrong" });
        console.log(err);
      });
  } else if (req.method === "PUT") {
    const document = db.doc(`/thoughts/${req.body.thoughtId}`);
    document
      .update({ thought: req.body.thought })
      .then((response) => res.json({ message: "Thought updated successfully" }))
      .catch((err) => res.status(500).json({ message: err.code }));
  } else if (req.method === "DELETE") {
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
