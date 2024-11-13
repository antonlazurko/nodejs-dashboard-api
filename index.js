import express from "express";

const port = 8000;

const app = express();

app.all("/hello", (req, res, next) => {
    console.log('all :>> ');
    next();
})

const cb = (req, res, next) => {
    console.log('cb :>> ');
    next();
}

app.route('/user').get((req, res) => {
        res.send("Hello World get");
    })
    .post((req, res) => {
        res.send("Hello World post");
    })
    .put((req, res) => {
        res.send("Hello World put");
    })
    .delete((req, res) => {
        res.send("Hello World delete");
    });

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});