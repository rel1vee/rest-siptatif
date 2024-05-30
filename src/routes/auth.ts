import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Connect, Query } from "../config/mysql";
import config from "../config/config";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, nama } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await Connect();
    const query = `INSERT INTO register (email, password, nama) VALUES ('${email}', '${hashedPassword}', '${nama}')`;
    await Query(connection, query);
    connection.end();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await Connect();
    const query = `SELECT * FROM register WHERE email = '${email}'`;
    const results: any = await Query(connection, query);
    connection.end();

    if (results.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

export default router;