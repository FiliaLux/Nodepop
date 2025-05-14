import Product from "../models/Product.js";

export async function index (req, res, next) {
    try {
        //res.locals.appName = "NodeApp"
        //throw new Error("fatal!");
        //const userID = req.session.userID
        
        //res.locals.products = await Product.find({owner: userID});

        //const products = await Product.find(); 
        
        const { tag, skip = 0, limit = 10, sort = "updated" } = req.query;

        const filter = {};
        if (tag) {
        filter.tags = tag;
        }

        const products = await Product.find(filter)
        .sort(sort)
        .skip(parseInt(skip))
        .limit(parseInt(limit));
  
        res.render("home", { products, query: req.query });
        
        //res.render("home", { products });
    
    } catch (error) {
        next(error);
    }  
};