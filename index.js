const express = require("express");
const app = express();
const port = 5500;
const bodyParser = require("body-parser");
const db = require("./config/db");
const Users = require("./models/userSchema");

// use middleware
app.use(bodyParser.json());

// create a route for the create user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const user = await Users.create({
      name,
      email,
      address,
      phone,
    });

    if (!user) {
      return res.status(200).json({ message: "user  already exist : ✅" });
    } else {
      return res
        .status(200)
        .json({ message: "user create successfully : ✅", user });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server Error : ❌", error });
  }
});

// crate a route for get all users
app.get("/api/users", async (req, res) => {
  try {
    const user = await Users.find({});
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server Error : ❌", error });
  }
});

// create a route for the get user by id
app.get("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found ❌❌" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server Error : ❌", error });
  }
});

// create a route for the update user
app.put("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = req.body;
    const user = await Users.findByIdAndUpdate(id, updateUser, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User Not Found ❌❌" });
    }
    console.log(user);
    return res
      .status(200)
      .json({ message: "User updated successfully : ✅", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error : ❌" });
  }
});

// create a route for the delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found ❌❌" });
    }
    return res.status(200).json({ message: "User Deleted successfully : 👍" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server Error : ❌", error });
  }
});

// server listing
app.listen(port, (err) => {
  if (err) {
    console.log("error on running server", err);
  } else {
    console.log(`server is runnig on port : ${port} ⭐⭐⭐`);
  }
});
