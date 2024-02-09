"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const { loading: profileLoading, data: profileData } = useProfile();

  async function handleNewCategorySubmit(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategoryName,
        }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      loading: "Creating your new category...",
      success: "Category created",
      error: "Error, sorry....",
    });
  }

  if (profileLoading) {
    return (
      <div className="text-primary text-3xl font-semibold min-h-[73vh] flex justify-center items-center">
        Loading....
      </div>
    );
  }

  if (!profileData.admin) {
    return (
      <div className="text-primary text-3xl font-semibold min-h-[73vh] flex justify-center items-center">
        You are not admin!
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={profileData.admin} />
      <form className="mt-10" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-center">
          <div className="grow">
            <label>New Category name</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <button type="submit" className="border border-primary">
              Create
            </button>
          </div>
        </div>
      </form>
      <div>
        
      </div>
    </div>
  );
};

export default CategoriesPage;
