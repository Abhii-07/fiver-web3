"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const user_1 = __importDefault(require("./routers/user"));
const worker_1 = __importDefault(require("./routers/worker"));
const express = require('express');
const app = express();
const port = 3001;
exports.JWT_SECRET = "abhi123";
app.use("/v1/user", user_1.default);
app.use("/v1/worker", worker_1.default);
app.listen(port);
