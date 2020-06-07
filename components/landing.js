import React, { useState, useEffect } from "react";

import moment from "moment";

// MUI
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

function Landing() {
  const [thought, setThought] = useState("");
  const [thoughts, setThoughts] = useState([]);
  const [thoughtsStatus, setThoughtsStatus] = useState(false);

  const fetchThoughts = async () => {
    try {
      const res = await fetch(new URL("/api/thoughts", document.baseURI));
      const data = await res.json();
      console.log(data);
      setThoughts(data);
      setThoughtsStatus(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(new URL("/api/thought", document.baseURI), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ thought: thought }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setThought("");
        setThoughtsStatus(false);
        fetchThoughts();
      });
  };

  const handleChange = (e) => {
    setThought(e.target.value);
  };

  const mapThoughts = () => {
    const thoughtsMap = thoughts.map((el, id) => (
      <>
        <ListItem alignItems="flex-start" key={id}>
          <ListItemText
            style={{ wordBreak: "break-all" }}
            primary={el.thought}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {moment(el.timestamp).fromNow()}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    ));
    return <List style={{ paddingBottom: "50px" }}>{thoughtsMap}</List>;
  };

  const displayLanding = !thoughtsStatus ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : thoughts.length === 0 ? (
    <Typography>No thoughts yet</Typography>
  ) : (
    mapThoughts()
  );

  return (
    <div>
      <Typography variant="h3" align="center" style={{ padding: "40px 0" }}>
        Random Thoughts 🤔
      </Typography>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "30px" }}>
          <TextField
            label="Type your thoughts..."
            // multiline
            variant="outlined"
            onChange={handleChange}
            value={thought}
            required
            fullWidth={true}
          />
        </div>
      </form>
      {displayLanding}
    </div>
  );
}

export default Landing;
