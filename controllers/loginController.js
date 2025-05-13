import User from "../models/User.js";

export function index(req, res, next) {
    res.locals.error = "";
    res.locals.email = ""; 
    res.render("login");
};

export async function postLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        const redir = req.query.redir;

        //buscar usuario en base de datos
        const user = await User.findOne({email: email});
        
        //si no lo encuentro o contraseña no coincide devuelvo error
        if (!user || !(await user.comparePassword(password))) {
            res.locals.error = "Invalid credentials";
            res.locals.email = email;
            res.render("login");
            return
        };
        
        //si todo funciona redirecciona a home estando logeado
        req.session.userID = user.id

        res.redirect(redir ? redir : "/");
    
    } catch (error) {
        next(error);
    }
};

export function logout (req, res, next) {
    req.session.regenerate(err => {
        if (err) {
            next(err)
            return
        }
        res.redirect("/");
    });
};