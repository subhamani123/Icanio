const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db/prisma");

dotenv.config();

const app = express();
const port = 5000;

app.get("/", async (req, res)=> {

await prisma.User.create({
    data: {
        name: "anu",
        email: "anu@gmail.com",
        password: "123456"
    }
})
//get all users
const users = await prisma.user.findMany();

//get all names
const names = users.map((user) => user.name);

//send response
res.send(
    `there are ${names.length} users with the names of: ${names.join(", ")}`
)
});
app.listen(port, () => console.log("app listening"));