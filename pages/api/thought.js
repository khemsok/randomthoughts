const { db, admin } = require("../../util/admin");
import authenticated from "../../util/authenticated";

export default authenticated((req, res) => {
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
  }
});
