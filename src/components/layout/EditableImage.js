import Image from "next/image";
import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import toast from "react-hot-toast";

import { app } from "@/libs/firebaseConfig";

const EditableImage = ({ userImage, setUserImage }) => {
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(false);
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);

  async function handleFileChange(e) {
    if (e.target?.files?.length > 0) {
      const file = e.target.files[0];
      setUserImage(URL.createObjectURL(file));
      setFile(file);
      setUpload(true);
    }
  }

  async function handleFileUpload() {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "-" + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageUploadError("Image upload failed");
            setImageUploadProgress(null);
            reject();
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL);
              setImageUploadProgress(null);
              setImageUploadError(null);
              setUserImage(downloadURL);
              setUpload(false);
              resolve();
            });
          }
        );
      });
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      });
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  }

  return (
    <div className="p-2 rounded-lg relative">
      {userImage && (
        <div className="relative mb-1 border-4 h-[140px] w-[140px] border-primary rounded-lg overflow-hidden">
          <Image className="" src={userImage} fill alt={"avatar"} />
        </div>
      )}
      {!userImage && (
        <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No Image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span
          className="block border border-gray-300 cursor-pointer rounded-xl p-3 text-center bg-primary text-white font-semibold hover:bg-orange-700 transition-all duration-200"
          onClick={handleFileChange}
        >
          Change
        </span>
      </label>
      {upload && (
        <button
          type="button"
          className="mt-1 bg-green-400 text-white font-semibold hover:bg-green-300 transition-all duration-300"
          onClick={handleFileUpload}
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default EditableImage;
