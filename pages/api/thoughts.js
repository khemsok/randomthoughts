const { db, admin } = require("../../util/admin");
import authenticated from "../../util/authenticated";

export default authenticated((req, res) => {
  if (req.method === "GET") {
    db.collection("thoughts")
      .orderBy("timestamp", "desc")
      .where("userId", "==", req.userId)
      .get()
      .then((data) => {
        let thoughts = [];
        data.forEach((doc) => {
          thoughts.push({
            thoughtId: doc.id,
            thought: doc.data().thought,
            timestamp: doc.data().timestamp,
          });
        });
        return res.json(thoughts);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err });
      });
  }
});
