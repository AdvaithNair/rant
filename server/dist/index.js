"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const dotenv_1 = require("dotenv");
// import morgan from 'morgan';
//Initialize .env File
dotenv_1.config({ path: path_1.resolve(__dirname, "../.env") });
// Initialize Express Variables
const app = express_1.default();
const PORT = Number(process.env["PORT"]);
// Initialize Express Server
// app.use(morgan('short'));
// Simple Hello Word
app.get('/', function (req, res) {
    res.send('Hello World!');
});
// App Listen
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT + '...');
});
