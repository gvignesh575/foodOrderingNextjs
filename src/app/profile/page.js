"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app, imageDB } from "@/libs/firebaseConfig";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "@/components/layout/UserTabs";

const ProfiePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const { status } = session;
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(false);
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchUser = async () => {
        try {
          const res = await fetch(`/api/profile`, {
            cache: "no-store",
          });
          const data = await res.json();
          console.log(data);
          setUserImage(data.image);
          setUserName(data.name);
          setCity(data?.city);
          setPhone(data?.phone);
          setCountry(data?.country);
          setPostalCode(data?.postalCode);
          setStreetAddress(data?.streetAddress);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [session, status]);

  console.log(isAdmin);

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image: userImage,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving....",
      success: "Profile Saved",
      error: "Error",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

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
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-m-xs mx-auto mt-4">
        <div className="flex gap-4">
          <div className="">
            <div className="p-2 rounded-lg relative">
              {userImage && (
                <div className="relative w-[170px] h-[150px] mb-1 border-4 border-primary rounded-lg overflow-hidden">
                  <Image className="" src={userImage} fill alt={"avatar"} />
                </div>
              )}
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span
                  className="block border border-gray-300 cursor-pointer rounded-lg p-2 text-center bg-primary text-white font-semibold hover:bg-orange-700 transition-all duration-200"
                  onClick={handleFileChange}
                >
                  Change
                </span>
              </label>
              {upload && (
                <button type="button" onClick={handleFileUpload}>
                  Upload
                </button>
              )}
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and last name</label>
            <input
              type="text"
              name=""
              id=""
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="First and last name"
            />
            <label>Email</label>
            <input
              type="email"
              value={session?.data?.user?.email}
              name=""
              disabled={true}
              id=""
            />
            <label>Street Address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => {
                setStreetAddress(e.target.value);
              }}
              placeholder="Street address"
            />
            <div className="flex gap-4">
              <div className="flex-1">
                <label>Postal Code</label>

                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                  placeholder="Postal code"
                />
              </div>

              <div className="flex-1">
                <label>City</label>

                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  placeholder="City"
                />
              </div>
            </div>
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Phone Number"
            />
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              placeholder="Country"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfiePage;
