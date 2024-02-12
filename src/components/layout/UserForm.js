"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../UseProfile";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [userImage, setUserImage] = useState(user?.image || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  return (
    <div className="flex gap-4">
      <div className="">
        <EditableImage userImage={userImage} setUserImage={setUserImage} />
      </div>
      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            image: userImage,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
            admin,
          })
        }
      >
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
        <input type="email" value={user.email} name="" disabled={true} id="" />
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
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className="mr-2"
                value={"1"}
                checked={admin}
                onClick={(e) => setAdmin(e.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
