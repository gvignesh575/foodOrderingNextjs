const { Schema, model, models } = require("mongoose");

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    streetAddress: {
      type: String,
    },
    postalCode: { type: String },
    country: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);
