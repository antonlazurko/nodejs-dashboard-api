import express from "express";
import { usersRouter } from "./users/users.js";

const port = 8000;

const app = express();

app.get('/hello', (req, res) => {
    throw new Error('Error')
})

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

app.use('/users', usersRouter)

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(err.message);
    // next();
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});