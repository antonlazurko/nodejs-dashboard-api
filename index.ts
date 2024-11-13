import express, { Request, Response, NextFunction } from "express";
import { usersRouter } from "./users/users.js";

const port = 8000;

const app = express();

app.get('/hello', (req: Request, res: Response) => {
    throw new Error('Error')
})

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now());
    next();
})

app.use('/users', usersRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).send(err.message);
    // next();
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});