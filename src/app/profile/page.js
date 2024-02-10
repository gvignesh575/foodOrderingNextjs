"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";

const ProfiePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const { status } = session;
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

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-m-xs mx-auto mt-4">
        <div className="flex gap-4">
          <div className="">
            <EditableImage userImage={userImage} setUserImage={setUserImage} />
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
