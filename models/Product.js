import mongoose, { SchemaTypes } from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: {type: Number},
    updated: {type: Date, default: Date.now},
    owner: {type: SchemaTypes.ObjectId, ref: "User", index: true}
}, {
    collection: "products"
});

const Product = mongoose.model("Product", productSchema);

export default Product;