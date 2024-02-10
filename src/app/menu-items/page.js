"use client";
import { useProfile } from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MenuItems = () => {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info....";
  }

  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={data.admin} />
      <div className="mt-8">
        <Link className="button mb-2 flex " href={"/menu-items/new"}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div className="mt-4">
        <h2>Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item.name}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative ">
                  <Image src={item.image} alt={""} width={200} height={200} />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
