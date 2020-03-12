const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.post("/login", (req, res) => {});

app.post("/sign-up", (req, res) => {});

app.get("/dashboard", (req, res) => {});

app.listen(port, () => {})
