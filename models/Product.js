import mongoose, { SchemaTypes } from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: {type: Number},
    updated: {type: Date, default: Date.now},
    image: String,
    owner: {type: SchemaTypes.ObjectId, ref: "User", index: true},
    tags: [String],
}, {
    collection: "products"
});

const Product = mongoose.model("Product", productSchema);

export default Product;