const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let user = {
    id: `kjdcbdncd`,
    email: `test@test.com`,
    password: "testing"
    
};

const jwtSecret = "test_secret";

app.get("/forgetPassword",(req, res) => {
    
})
app.post("/forgetPassword", (req, res) => {
    const {email
} = req.body;

    if (email !== user.email) {
        console.log("user not registered");
        return;
    }

    const secret = jwtSecret + user.password;

    const payload = {
        email: user.email,
        id: user.id
    }

    const token = jwt.sign(payload, secret, { expiresIn: `30m` });
    const link = `http://localhost:4001/resetPassword/${user.id}/${token}`

    res.status(200).json(link);
})
app.get("/resetPassword/:id/:token",(req, res) => {
    const { id, token } = req.params
    if (id !== user.id) {
        console.log("Invalid Id");
        return;
    }

    const secret = jwtSecret + user.password

    try {
        const payload = jwt.verify(token, secret)

        res.status(200).json("Verified!");

    } catch (error) {
        console.log(error)
    }
})
app.post("/resetPassword/:id/:token",(req, res) => {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;

    if (id !== user.id) {
        console.log("Invalid Id");
        return;
    }

    const secret = jwtSecret + user.password

    try {
        const payload = jwt.verify(token, secret);

        //validate both are same

        //find user and update
        user.password = password
        res.status(200).json("password changed");
        //user.save();
    } catch (error) {
        console.timeLog(error)
    }
})

app.listen(4001)