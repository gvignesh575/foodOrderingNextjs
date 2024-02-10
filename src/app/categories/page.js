"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  console.log(categories);

  const { loading: profileLoading, data: profileData } = useProfile();

  async function handleCategorySubmit(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editedCategory ? "Category Updated" : "Category created",
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
      <form className="mt-10" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-center">
          <div className="grow">
            <label>
              {editedCategory ? "Update category" : "New Category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>{" "}
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <button type="submit" className="border border-primary">
              {editedCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        {categories.length > 0 &&
          categories.map((c) => (
            <button
              onClick={() => {
                setEditedCategory(c);
                setCategoryName(c.name);
              }}
              key={c._id}
              className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-2"
            >
              <span>{c.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
