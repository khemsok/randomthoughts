const { db } = require("../../util/admin");

export default (req, res) => {
  if (req.method === "GET") {
    db.collection("thoughts")
      .orderBy("timestamp", "desc")
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
        return res.status(500).json({ error: err.code });
      });
  }
};
