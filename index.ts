import express, { Express, Request, Response } from 'express';
import add from './service/calc'; // TypeScript will infer types from calc.ts

const app: Express = express();
app.use(express.json());

app.post('/add', (req: Request, res: Response) => {
    try {
        const { numbers } = req.body as { numbers: string }; // Type assertion for req.body
        const result: number = add(numbers);
        res.json({ result });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

const PORT: number | string = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;