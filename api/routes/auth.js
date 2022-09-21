// const router = require('express').Router();
import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import { genSalt, hash, compare } from 'bcrypt';

//REGISTER
router.post('/register', async (req, res) => {
  try {
    const salt = await genSalt(10);
    const hashedPass = await hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    !user && res.status(401).json('Wrong username or password!');

    const validated = await compare(req.body.password, user.password);
    !validated && res.status(401).json('Wrong username or password!');

    const { password, ...others } = user._doc; // give a resp everything but the password
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
