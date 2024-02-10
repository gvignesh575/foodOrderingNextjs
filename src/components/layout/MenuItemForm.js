"use client";
import React, { useState } from "react";
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
  console.log(sizes);
  return (
    <form
      className="mt-8 max-w-md mx-auto"
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
          <label>Base price</label>
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
