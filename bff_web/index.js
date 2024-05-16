// 3000 -> web service
// 8080 -> product service
// 9000 -> users service 
// 8081 -> order service

const express = require("express");
const app = express();
const grpc = require("@grpc/grpc-js");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const axios = require('axios');
const bodyParser = require('body-parser');
const connectDB = require("./config/database");
const Log = require("./models/log");

//app.use(express.json());
app.use(bodyParser.json({ limit: '50mb', extended: true, type: 'application/json' }));

app.use(cors());

connectDB();

const orderServiceProxy = createProxyMiddleware({
    target: "http://order-service:8080",
    changeOrigin: true,
    pathRewrite: {
        "^/order": "/order",
    },
    onProxyReq: function (proxyReq, req, res) {
        if (req.body) {
            let bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
    onProxyRes: function (proxyRes, req, res) {
        console.log(`Proxying request: ${req.method} ${req.url} to ${proxyRes.statusCode} ${proxyRes.statusMessage}`);
    },
    onError: function (err, req, res) {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy Error');
    }
});

const productsProxy = createProxyMiddleware({
    target: 'http://product-service:8080',
    changeOrigin: true,
    pathRewrite: {
        '^/api/product': '/api/product'
    },
    onProxyReq: function (proxyReq, req, res) {
        if (req.body) {
            let bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
});

app.use("/order", orderServiceProxy);
app.use('/api/product', productsProxy);

const {
    UserServiceClient,
} = require("./generated/proto/user_grpc_pb");
const {
    GetUserRequest,
    CreateUserRequest,
    EditUserRequest,
    DeleteUserRequest,
} = require("./generated/proto/user_pb");

const client = new UserServiceClient(
    'user-service:9000',
    grpc.credentials.createInsecure()
);

app.get('/user/:id', (req, res) => {
    const request = new GetUserRequest();
    request.setId(req.params.id);

    client.getUser(request, (err, response) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.send(response.toObject());
    });
});

app.post('/user', (req, res) => {
    const request = new CreateUserRequest();
    request.setFirstname(req.body.firstName);
    request.setLastname(req.body.lastName);
    request.setEmail(req.body.email);
    request.setPassword(req.body.password);
    request.setRole(req.body.role);

    client.createUser(request, (err, response) => {
        if (err) {
            res.status(500).send(err);
            return;
        } else {
            console.log("Response:", response);
            res.json(response);
        }
    });
});

app.put('/user/:id', (req, res) => {
    const { id, firstName, lastName, email, password, role } = req.body;
    const request = new EditUserRequest();
    request.setId(id);
    if (firstName) request.setName(firstName);
    if (lastName) request.setLastName(lastName);
    if (email) request.setEmail(email);
    if (password) request.setPassword(password);
    if (role) request.setRole(role);

    client.editUser(request, (err, response) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("Response:", response);
            res.json(response);
        }
    });
});

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const request = new DeleteUserRequest();
    request.setId(id);

    client.deleteUser(request, (err, response) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("User deleted successfully");
            res.status(204).end();
        }
    });
});

//Middleware to log requests
app.use(async (req, res, next) => {
    const excludedEndpoints = ["/"];

    if (excludedEndpoints.includes(req.path)) {
        return next();
    }

    const logEntry = {
        action: req.path,
        timestamp: new Date(),
        method: req.method,
        url: req.originalUrl,
    };

    try {
        const log = new Log(logEntry);
        await log.save();
        next();
    } catch (error) {
        console.error("Error logging request:", error);
        next(error);
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`BFF Web listening at http://localhost:${PORT}`);
});