import mongoose from 'mongoose';
import User from '../users/user.model.js'; 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    images: [
        {
            type: String,
        },
    ],
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    userIds: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User", 
            },
          },
        ],
} , {
    timestamps: true,
});


const AllProduct = mongoose.model('AllProduct', productSchema);
export default AllProduct;