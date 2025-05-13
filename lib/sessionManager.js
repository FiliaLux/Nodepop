import session from "express-session";
import MongoStore from "connect-mongo";

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2;

//middleware para gestionar sesiones
export const middleware = session({
    name: "nodeapp-session",
    secret: "VkF8*b4FVYm@56WSVRBVCnBUDIr#*bqn&&*++j",
    savedUninitialized: false,
    resave: false,
    cookie: {maxAge: INACTIVITY_EXPIRATION_2_DAYS},
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/cursonode"
    })
});

export function useSessionInViews (req, res, next) {
    res.locals.session = req.session;
    next();
} 

export function guard (req, res, next) {
    if (!req.session.userID) {
        res.redirect(`/login?redir=${req.url}`);
        return
    } 
    next()
}