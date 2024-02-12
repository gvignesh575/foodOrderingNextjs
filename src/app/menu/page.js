"use client";
import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick(menuItem) {
    if (sizes.length === 0 && extraIngredientPrices.length === 0) {
      addToCart(menuItem);
      toast.success("Added to cart!");
    } else {
      setShowPopup(true);
    }
  }

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
                <>
                  {showPopup && (
                    <div className="fixed top-0 left-0 right-0  inset-0 bg-black/80 flex items-center justify-center">
                      <div className="my-8 bg-white p-4 rounded-lg max-w-md overflow-scroll">
                        <div></div>
                        <Image
                          src={item.image}
                          alt="food image"
                          width={300}
                          height={200}
                          className="mx-auto"
                        />
                        <h2 className="mb-4 text-lg font-bold text-center">
                          {item.name}
                        </h2>
                        <p className="text-center text-gray-500 text-sm ">
                          {item.description}
                        </p>
                        {sizes?.length > 0 && (
                          <div className="py-2">
                            <h3 className="text-center text-gray-300">
                              Pick your size
                            </h3>
                            {sizes.map((size) => (
                              <div className="p-2" key={size._id}>
                                <label className="flex items-center gap-2  p-2 border rounded-md mb-1">
                                  <input type="radio" name="size" id="" />
                                  {size.name}
                                  {"    "}${basePrice + size.price}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                        {extraIngredientPrices?.length > 0 && (
                          <>
                            <div></div>{" "}
                            <div className="py-2">
                              <h3 className="text-center text-gray-300">
                                Pick your size
                              </h3>
                              {extraIngredientPrices.map((extraThing) => (
                                <div className="p-2" key={extraThing._id}>
                                  <label className="flex items-center gap-2  p-2 border rounded-md mb-1">
                                    <input
                                      type="checkbox"
                                      name={extraThing.name}
                                      id=""
                                    />
                                    {extraThing.name}
                                    {"    "}${basePrice + extraThing.price}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        <button type="button">Add to cart</button>
                      </div>
                    </div>
                  )}
                  <div
                    key={item._id}
                    className="border rounded-xl overflow-hidden hover:bg-primary shadow-lg hover:text-white transition-all duration-300 group"
                  >
                    <div className="relative w-full h-[200px] group-hover:scale-[1.1] transition-all duration">
                      <Image src={item.image} fill alt={"pizza image"} />
                    </div>
                    <div className="p-3 flex flex-col gap-3 min-h-[150px]">
                      <div className="font-bold text-xl text-it">
                        {item.name}
                      </div>
                      <div className="line-clamp-4 font-semibold">
                        {item.description}
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            handleAddToCartButtonClick(item);
                          }}
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
                </>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
