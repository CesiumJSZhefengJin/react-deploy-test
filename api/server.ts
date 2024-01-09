// q@ts-nocheck
/* qeslint-disable */
import app from "./app";
import path from "path";
import dotenv from "dotenv";

// Default Port
const port = process.env.PORT || 8080;

// Start server
const server = app.listen(port);

server.on("error", function (e: any) {
    if (e.code === "EADDRINUSE") {
        console.log("Port is already in use, select a different port.", port);
    } else if (e.code === "EACCES") {
        console.log("Error: This process does not have permission to listen on port %d.", port);
        if (port < 1024) {
            console.log("Try a port number higher than 1024.");
        }
    }

    console.log(e);
    process.exit(1);
});

server.on("close", function () {
    console.log("server stopped.");
});

let isFirstSig = true;

process.on("SIGINT", function () {
    if (isFirstSig) {
        console.log("server shutting down.");
        server.close(function () {
            process.exit(0);
        });
        isFirstSig = false;
    } else {
        console.log("server force kill.");
        process.exit(1);
    }
});
