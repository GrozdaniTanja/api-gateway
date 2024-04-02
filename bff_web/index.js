// 8080 -> web service
// 8081 -> product service
// 8082 -> users service 
// 8083 -> order service

const express = require("express");
const app = express();
const grpc = require("@grpc/grpc-js");
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(express.json());


const orderServiceProxy = createProxyMiddleware({
    target: "http://localhost:8083",
    changeOrigin: true,
    pathRewrite: {
        "^/order": "/order",
    },
});

const productsProxy = createProxyMiddleware({
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: {
        '^/api/product': '/api/product'
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
    'localhost:8082',
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
            console.log("Membership deleted successfully");
            res.status(204).end();
        }
    });
});




const PORT = 8080;
app.listen(PORT, () => {
    console.log(`BFF Web listening at http://localhost:${PORT}`);
});