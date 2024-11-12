import http from "http";

const host = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Hello World\n');
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Not Found\n');
            }
            break;
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});