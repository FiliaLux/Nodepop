import Product from "../models/Product.js";

export async function index (req, res, next) {
    try {
        //res.locals.appName = "NodeApp"
        //throw new Error("fatal!");
        const userID = req.session.userID
        
        res.locals.products = await Product.find({owner: userID});
        
        res.render("home");
    
    } catch (error) {
        next(error);
    }  
};