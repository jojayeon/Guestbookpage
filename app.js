const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const requestListener = (req, res) => {
    const method = req.method;
    const url = req.url;

    if (method === 'GET') {
        if (url === '/') {
            // 클라이언트에게 index.html 파일 전송
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
            // 클라이언트에게 style.css 파일 전송
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
            // 클라이언트에게 script.js 파일 전송
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
            // 요청된 파일이 없을 경우 404 에러 응답
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
            const filePath = path.join(__dirname, 'guestbook.json');

            fs.readFile(filePath, (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    return res.writeHead(500, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Failed to read file' }));
                }

                const entries = data ? JSON.parse(data) : [];
                entries.push(entry);

                fs.writeFile(filePath, JSON.stringify(entries, null, 2), (err) => {
                    if (err) {
                        return res.writeHead(500, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Failed to write file' }));
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ message: 'Entry saved successfully' }));
                });
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Not Found' }));
    }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});