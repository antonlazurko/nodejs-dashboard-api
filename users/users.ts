import express from "express";

const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
    console.log('usersRouter event Time: ', Date.now());
    next();
})

usersRouter.post("/login", (req, res) => {
    res.send("Login");
});
usersRouter.post("/register", (req, res) => {
    res.send("Register");
});

export { usersRouter }