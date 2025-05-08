import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    address: String,
    password: { type: String, required: true },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // assumes you have Product model
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    orders: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        orderedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    
    
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;
