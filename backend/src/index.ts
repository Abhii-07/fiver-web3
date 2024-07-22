import { Express } from "express";
import userRouter from "./routers/user"
import workerRouter from "./routers/worker"

const express = require('express')
const app = express();
const port = 3001

export const JWT_SECRET = "abhi123";
app.use(express.json());


app.use("/v1/user", userRouter);
app.use("/v1/worker", workerRouter);

app.listen(port)
