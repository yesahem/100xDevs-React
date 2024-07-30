const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const { Account, User } = require("../db");
const { authMiddleware } = require("./middleware");

const inputValidation = zod.object({
  username: zod.string(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = inputValidation.safeParse(body);
  if (!success) {
    return res.json({
      mssge: "Email already taken / Incorrect inputs",
    });
  }

  const userExist = await User.findOne({
    username: req.body.username,
  });

  if (userExist._id) {
    return res.json({
      mssg: "Email already taken / Incorrect inputs",
    });
  }

  const createUser = await User.create(body);
  const userID = createUser._id;
  // ------ Creating Account ---------
  await Account.create({
    userID,
    balance: Math.floor(Math.random() * 10000 + 1),
  });
  const token = jwt.sign(
    {
      username: req.body.username,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
    },
    JWT_SECRET,
  );
  res.json({
    mssg: "User Created sucessfully",
    token: token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = inputValidation.safeParse(body);
  if (!success) {
    return res.status(400).json({
      mssge: "Email already taken / Incorrect inputs",
    });
  }

  const userExistence = await User.find({
    username: body.username,
    password: body.password,
  });

  if (userExistence) {
    const token = jwt.sign(
      {
        username: body.username,
        password: body.password,
      },
      JWT_SECRET,
    );

    return res.json({
      token: token,
    });
  } else {
    res.status(411).json({
      mssg: "Error while logging ",
    });
  }
});

const updatedBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});
userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updatedBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  } else {
    await User.findOneAndUpdate(
      {
        _id: req.userID,
      },
      req.body,
    );
    res.status(200).json({
      mssg: "Updated sucessfully",
    });
  }
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter;
  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });
  res.json({
    user: users.map((user) => {
      (username = user.username),
        (firstname = user.firstName),
        (lastname = user.lastName),
        (id = user._id);
    }),
  });
});
module.exports = userRouter;
