import express from "express";
import { usersRouter } from "./users/users.js";

const port = 8000;

const app = express();

app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});