import * as upload from "../lib/imageUpload.js";
import Product from "../models/Product.js";

export function index (req, res, next) {
    const predefinedTags = ["art", "motor", "mobile", "lifestyle"];
    res.render("new-product", { predefinedTags });
};

export async function postNew (req, res, next) {
    try {
        
        const {name, price, tags} = req.body;
        const userID = req.session.userID;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        
        let tagArray = [];
        if (tags) {
            tagArray = tags
              .split(',')
              .map(t => t.trim().toLowerCase())
              .filter(t => t.length > 0);
        };
        
        // creo una instancia de producto en memoria
        const product = new Product({name, price, image, tags: tagArray, owner: userID});

        // lo guardo en base de datos
        await product.save()

        res.redirect("/");

    } catch (error) {
        next(error)
    }
};

export async function deleteProduct (req, res, next) {
    try {
        
        const productID = req.params.productID;
        const userID = req.session.userID;
        await Product.deleteOne({_id: productID, owner: userID});

        res.redirect("/");

    } catch (error) {
        next(error)
    }
};

export async function myProducts(req, res, next) {
    try {
      const products = await Product.find({ owner: req.session.userID });
      res.render("my-products", { products });
    } catch (err) {
      next(err);
    }
  }