import User from "../../models/users/user.model.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const editUser = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    address,
    currentPassword,
    newPassword,
    confirmNewPassword,
  } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.address = address || user.address;

    if (currentPassword || newPassword || confirmNewPassword) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ success: false, message: "All password fields are required to update password" });
      }

      if (currentPassword !== user.password) {
        return res.status(401).json({ success: false, message: "Current password is incorrect" });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ success: false, message: "New passwords do not match" });
      }

      user.password = newPassword;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Edit user error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  const userId = req.userId; // middleware se aata hai
  const { productId, quantity} = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity required" });
  }

  try {
    const user = await User.findById(userId);

    const existingItem = user.cart.find((item) =>
      item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

export const  removeFromCart = async (req, res) => {

  const userId = req.userId; // middleware se aata hai
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID required" });
  }

  try {
    const user = await User.findById(userId);

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error: error.message });
  }
}

export const getCartData = async (req, res) => {
  const userId = req.userId; // middleware se aata hai

  try {
    const user = await User.findById(userId).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    // console.log(user.cart)
    res.status(200).json({ cart: user.cart });
  }

  catch (error) {
    res.status(500).json({ message: "Error fetching cart data", error: error.message });
  }
}

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user || user.cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty or user not found',
      });
    }

    // Transfer cart items to orders
    const newOrders = user.cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      orderedAt: new Date(),
    }));

    user.orders.push(...newOrders);
    user.cart = []; // Clear the cart

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      orders: user.orders,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message,
    });
  }
};
export const getUser = async (req, res) => {
  const userId = req.userId; // middleware se aata hai

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching user data", error: error.message });
  }
}
