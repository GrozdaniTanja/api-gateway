// 4000 -> mobile service
// 8080 -> product service
// 9000 -> users service 
// 8081 -> order service

const express = require("express");
const app = express();
const grpc = require("@grpc/grpc-js");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

app.use(express.json());
app.use(cors())


const orderServiceProxy = createProxyMiddleware({
    target: "http://order-service:8080",
    changeOrigin: true,
    pathRewrite: {
        "^/order": "/order",
    },
    onProxyReq: (proxyReq, req, res) => {
        if (req.method === "GET" || req.method === "DELETE") {
            proxyReq.setHeader("Content-Type", "application/json");
        } else {
            res
                .status(405)
                .json({ error: "Sorry, this action is not possible on mobile. " });
            res.end();
        }
    },
});

const productsProxy = createProxyMiddleware({
    target: 'http://product-service:8080',
    changeOrigin: true,
    pathRewrite: {
        '^/api/product': '/api/product'
    },
    onProxyReq: (proxyReq, req, res) => {
        if (req.method === "GET" || req.method === "DELETE") {
            proxyReq.setHeader("Content-Type", "application/json");
        } else {
            res
                .status(405)
                .json({ error: "Sorry, this action is not possible on mobile. " });
            res.end();
        }
    },
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


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`BFF Mobile listening at http://localhost:${PORT}`);
});