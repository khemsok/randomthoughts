import React, { useState, useEffect } from "react";
import SignOut from "./signout";

import moment from "moment";
import Cookies from "js-cookie";

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

// MUI Icons
import DeleteIcon from "@material-ui/icons/Delete";

function Landing(cookie) {
  const [thought, setThought] = useState("");
  const [thoughts, setThoughts] = useState([]);
  const [thoughtsStatus, setThoughtsStatus] = useState(false);

  const fetchThoughts = async () => {
    try {
      const res = await fetch(new URL("/api/thoughts", document.baseURI));
      console.log(res.status);
      if (res.status == 200) {
        const data = await res.json();
        console.log(data);
        setThoughts(data);
        setThoughtsStatus(true);
      } else {
        // Router.replace("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteThought = async (thoughtId) => {
    console.log(thoughtId, "yooo delete thougth");
    const resp = await fetch(new URL("/api/deletethought", document.baseURI), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ thoughtId: thoughtId }),
    });
    const data = await resp.json();
    console.log(data);
    await fetchThoughts();
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setThought("");
    setThoughtsStatus(false);
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
        fetchThoughts();
      })
      .catch((e) => console.error(e));
  };

  const handleChange = (e) => {
    setThought(e.target.value);
  };

  const mapThoughts = () => {
    const thoughtsMap = thoughts.map((el, id) => (
      <div key={el.thoughtId}>
        <ListItem alignItems="flex-start">
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
          <DeleteIcon
            onClick={() => {
              deleteThought(el.thoughtId);
            }}
            style={{ cursor: "pointer" }}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
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
      <SignOut />

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
