const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const guestbookPath = path.join(__dirname, 'guestbook.json');

const requestListener = (req, res) => {
    const method = req.method;
    const url = req.url;

    if (method === 'GET') {
        if (url === '/') {
            const filePath = path.join(__dirname, 'index.html');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('500 Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        } else if (url === '/style.css') {
            const filePath = path.join(__dirname, 'style.css');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('500 Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            });
        } else if (url === '/script.js') {
            const filePath = path.join(__dirname, 'script.js');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('500 Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    } else if (method === 'POST' && url === '/post-submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const entry = JSON.parse(body);
            fs.readFile(guestbookPath, (err, data) => {
                let entries = [];
                if (!err) {
                    entries = JSON.parse(data);
                }
                entries.push(entry);
                fs.writeFile(guestbookPath, JSON.stringify(entries, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Failed to write file' }));
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Entry saved successfully' }));
                });
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});