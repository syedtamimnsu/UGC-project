import { clerkMiddleware } from '@clerk/express';
import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from 'express';
import "./configs/instrument.mjs";
import clerkWebhook from './controllers/clerk';

const app = express();

// Middleware
app.use(cors())

app.post('/api/clerk', express.raw({type: 'application/json'}), clerkWebhook);


app.use(express.json());
app.use(clerkMiddleware())


const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});



// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});