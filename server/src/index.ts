import express, {Request, Response} from 'express';
import { resolve } from "path"
import { config } from "dotenv"
// import morgan from 'morgan';

// Initialize .env File
config({ path: resolve(__dirname, "../.env") })

// Initialize Express Variables
const app: express.Application = express();
const PORT: number = Number(process.env["PORT"]);

// Initialize Express Server
// app.use(morgan('short'));

// Simple Hello Word
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

// App Listen
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT +'...');
});