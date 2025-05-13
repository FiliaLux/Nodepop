import Product from "../models/Product.js";

export async function index (req, res, next) {
    try {
        //res.locals.appName = "NodeApp"
        //throw new Error("fatal!");
        const userID = req.session.userID
        
        res.locals.products = await Product.find({owner: userID});

        const products = await Product.find(); // ← Todos los productos
        
        res.render("home", { products });
    
    } catch (error) {
        next(error);
    }  
};