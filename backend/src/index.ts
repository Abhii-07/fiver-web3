// url : postgresql://myDB_owner:RaPEZQJ42lkY@ep-tight-river-a11txxui.ap-southeast-1.aws.neon.tech/myDB?sslmode=require
import { Express } from "express";
const express = require('express')
const app = express();
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))