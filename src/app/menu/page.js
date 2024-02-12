"use client";
import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <div key={category._id}>
          <h1 className="text-primary text-4xl font-bold italic text-center my-4">
            {category.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            {menuItems
              .filter((menuItem) => menuItem.category === category._id)
              .map((item) => (
                <div
                  key={item._id}
                  className="border rounded-xl overflow-hidden hover:bg-primary shadow-lg hover:text-white transition-all duration-300 group"
                >
                  <div className="relative w-full h-[200px] group-hover:scale-[1.1] transition-all duration">
                    <Image src={item.image} fill alt={"pizza image"} />
                  </div>
                  <div className="p-3 flex flex-col gap-3 min-h-[150px]">
                    <div className="font-bold text-xl text-it">{item.name}</div>
                    <div className="line-clamp-4 font-semibold">
                      {item.description}
                    </div>
                    <div>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-primary text-white border border-7 border-white group-hover:bg-white group-hover:text-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                        Add to Cart ${item.basePrice}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
