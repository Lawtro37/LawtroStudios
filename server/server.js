const http = require("http");

const host = 'localhost';
const port = 8000;

let data = {};

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    switch (req.url) {
        case "/send":
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                let receivedData = JSON.parse(body); // parse the received data
                let privateId = receivedData.privateId; // get the private ID from the received data
                if (!privateId) {
                    res.end(JSON.stringify({ error: 'No private ID provided' }));
                    return;
                }
                if (!data[privateId]) { // if there's no data for this private ID, initialize it
                    data[privateId] = { publicId: receivedData.publicId, userData: {} };
                }
                data[privateId].userData = { ...data[privateId].userData, ...receivedData.data }; // merge the existing data with the new data
                res.end(JSON.stringify({ publicId: data[privateId].publicId, userData: data[privateId].userData })); // send the public ID and data for this private ID back as a response
            });
            break;
        case "/data":
            let publicId = req.headers['x-public-id']; // get the public ID from the headers
            if (!publicId) {
                res.end(JSON.stringify({ error: 'No public ID provided' }));
                return;
            }
            let privateId = Object.keys(data).find(key => data[key].publicId === publicId);
            if (!privateId) {
                res.end(JSON.stringify({ error: 'Invalid public ID' }));
                return;
            }
            res.end(JSON.stringify(data[privateId].userData)); // send the data for this public ID back as a response
            break;
        default:
            res.end(JSON.stringify({ error: 'Invalid request' }));
            break;
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});