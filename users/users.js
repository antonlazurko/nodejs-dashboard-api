import express from "express";

const usersRouter = express.Router();

usersRouter.post("/login", (req, res) => {
    res.send("Login");
});
usersRouter.post("/register", (req, res) => {
    res.send("Register");
});

export { usersRouter }