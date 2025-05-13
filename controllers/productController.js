import Product from "../models/Product.js";

export function index (req, res, next) {
    res.render("new-product");
};

export async function postNew (req, res, next) {
    try {
        
        const {name, price} = req.body;
        const userID = req.session.userID;
        
        // validaciones
        
        // creo una instancia de producto en memoria
        const product = new Product({name, price, owner: userID});

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