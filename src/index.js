// import dbInit from "./db/init";
const express = require("express");
require("dotenv").config();
const { routes: overAlldata } = require("./routes/over");

const app = express();
require("./db/init");

// dbInit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1", routes);
app.use("/", overAlldata);

// handler()

module.exports = app;
