import React, { useState } from "react";
import { Button } from "@mui/material";
import { storage, db } from "./firebase";
import firebase from "firebase/compat";

export default function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state.changed",
      (snapshot) => {
        // progress function..
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image in database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
              name: image.name,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div>
      {/* Caption Input */}
      {/* File picker */}
      {/* post button */}

      {/* caption & progress bar input not displaying */}
      <progress value={progress} max="100"></progress>

      <input
        type="text"
        placeholder="Enter a caption ..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      {image ? (
        <Button onClick={handleUpload}>Upload</Button>
      ) : (
        <p>Please select an image</p>
      )}
    </div>
  );
}
