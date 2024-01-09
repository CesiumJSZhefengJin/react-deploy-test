// q@ts-nocheck
/* qeslint-disable */
import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
const xss = require("xss-clean");

require("colors");
require("express-async-errors");

app.set("trust proxy", true);

// Enable body parser
app.use(express.json({ limit: "50mb" }));

// Enable cookie parser
app.use(cookieParser());

// Server build folder
app.use(express.static(path.join(__dirname, "build")));

// Set security HTTP headers
app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Enable cors
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Fixes bug that causes error with routing in react if page is refreshed anywhere but dashboard
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
            console.log(err);
        }
    });
});

export default app;
