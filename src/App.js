import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { Input, Box, Button, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          //dont update username
        } else {
          // if profile just created
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user has logged out
        setUsername(null);
      }
    });
  }, [user, username]);

  const handleLogin = () => {};

  useEffect(() => {
    db.collection(`posts`).onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <form className="app__signup">
              <center>
                <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="instagram logo"
                />
              </center>

              <Input
                placeholder="username"
                type="text"
                value={username}
                onchange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onchange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onchange={(e) => setPassword(e.target.value)}
              />
            </form>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={signUp}>Sign Up</Button>
          </div>
        </Box>
      </Modal>
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram logo"
        />
      </div>

      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      <h1> INSTAGRAM CLONE</h1>

      {/* Posts */}
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
