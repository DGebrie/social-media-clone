import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore/lite";

function App() {
  const [posts, setPosts] = useState([
    // {
    //   username: "twosmov",
    //   caption: "You asked for my hustle, I gave you my heart. RIP24",
    //   imageUrl:
    //     "https://cdn.dribbble.com/users/2289238/screenshots/9780542/kobe-bryant-rip-1.jpg",
    // },
    {
      username: "twosmov",
      caption: "You asked for my hustle, I gave you my heart. RIP24",
      imageUrl:
        "https://cdn.dribbble.com/users/2289238/screenshots/9780542/kobe-bryant-rip-1.jpg",
    },
  ]);

  useEffect(() => {
    // db.collection("posts").onSnapshot((snapshot) => {
    //   setPosts(snapshot.docs.map((doc) => doc.data()));
    // });
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "/posts"));
      querySnapshot.forEach((snapshot) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // setPosts(snapshot.docs.map((doc) => doc.data()));
      });
    };
    fetchData();
  }, [posts]);

  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram logo"
        />
      </div>
      <h1> INSTAGRAM CLONE</h1>

      {posts.map((post) => (
        <Post
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
      {/* <Post
        username="twosmov"
        caption="You asked for my hustle, I gave you my heart.
        RIP24"
        imageUrl="https://cdn.dribbble.com/users/2289238/screenshots/9780542/kobe-bryant-rip-1.jpg"
      />
      <Post
        username="mebratu2"
        caption="goat x goat"
        imageUrl="https://static.independent.co.uk/2021/04/16/07/newFile.jpg?width=982&height=726&auto=webp&quality=75"
      />
      <Post
        username="jordan23air"
        caption="Flu Game: '97 NBA Finals Game 6 @Utah Jazz"
        imageUrl="https://theundefeated.com/wp-content/uploads/2017/06/gettyimages-86342542-1.jpg?w=700"
      /> */}
    </div>
  );
}

export default App;
