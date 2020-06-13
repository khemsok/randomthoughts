import React, { useState, useEffect } from "react";
import SignOut from "./signout";

import moment from "moment";
import Cookies from "js-cookie";

// MUI
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

// MUI Icons
import DeleteIcon from "@material-ui/icons/Delete";

function Landing(cookie) {
  const [thought, setThought] = useState("");
  const [thoughts, setThoughts] = useState([]);
  const [thoughtsStatus, setThoughtsStatus] = useState(false);

  const fetchThoughts = async () => {
    try {
      const res = await fetch(new URL("/api/thoughts", document.baseURI));
      if (res.status == 200) {
        const data = await res.json();
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
    setThoughtsStatus(false);
    const resp = await fetch(new URL("/api/deletethought", document.baseURI), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ thoughtId: thoughtId }),
    });
    const data = await resp.json();
    await fetchThoughts();
    setThoughtsStatus(true);
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <div
            style={{
              flex: "1 1 auto",
              wordBreak: "break-all",
              margin: "10px 0px",
            }}
          >
            <Typography variant="subtitle1">{el.thought}</Typography>
            <Typography variant="body2">
              {moment(el.timestamp).fromNow()}
            </Typography>
          </div>
          <IconButton
            style={{
              float: "right",
              verticalAlign: "middle",
            }}
            onClick={() => {
              deleteThought(el.thoughtId);
            }}
            style={{ cursor: "pointer" }}
          >
            <DeleteIcon />
          </IconButton>
        </div>

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
