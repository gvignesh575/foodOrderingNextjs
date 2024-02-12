"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import UserForm from "@/components/layout/UserForm";

const ProfiePage = () => {
  const session = useSession();
  const { status } = session;
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
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
          setUser(data);
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

  async function handleProfileInfoUpdate(e, data) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div className="max-m-2xl mx-auto mt-4">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
};

export default ProfiePage;
