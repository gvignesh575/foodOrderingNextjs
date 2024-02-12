"use client";
import React, { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./menuItemPriceProps";

const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [image, setImage] = useState(menuItem?.image);
  const [name, setName] = useState(menuItem?.name);
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) =>
      res.json().then((categories) => {
        setCategories(categories);
      })
    );
  }, []);

  return (
    <form
      className="mt-8 max-w-2xl mx-auto"
      onSubmit={(e) =>
        onSubmit(e, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
        })
      }
    >
      <div
        className="grid gap-2 items-start"
        style={{ gridTemplateColumns: ".3fr 1fr" }}
      >
        <div className="max-w-[200px]">
          <EditableImage userImage={image} setUserImage={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.length > 0 &&
              categories.map((c, index) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Base Price</label>
          <input
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            type="text"
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
