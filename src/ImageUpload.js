import React, { useState } from "react";
import { Button } from "@mui/material";
import { storage, db } from "./firebase";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  //   const [url, setUrl] = useState("");
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
        storage.ref("images").child(image.name).getDownloadURL();
      }
    );
  };

  return (
    <div>
      {/* Caption Input */}
      {/* File picker */}
      {/* post button */}
      <imput
        type="text"
        placeholder="Enter a caption ..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} value={image} />
      <Button className="imageupload__button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}
