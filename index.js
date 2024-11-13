import express from "express";

const port = 8000;

const app = express();

app.all("/hello", (req, res, next) => {
    console.log('all :>> ');
    next();
})

app.route('/').get((req, res) => {
    // res.redirect(301, '/hello');
    res.status(404).end()
})
app.route('/hello').get((req, res) => {
        // res.set('Content-Type', 'text/plain');
        res.type('application/json');
        res.cookie('token', '12345', {
            domain: 'localhost',
            path: '/',
            secure: true,
            expires: new Date(0)
        });
        res.clearCookie('token', {
            path: '/'
        });
        res.send("Hello World");
        // res.download('./README.md', 'test.md');
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