import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chatbot',
  password: 'SiriAlexi1',
  port: 5432,
});

interface NodeData {
  chat_id: string;
  node_id: string;
  data: object;
}

app.post('/nodes', async (req: Request, res: Response) => {
  const { chat_id, node_id, data }: NodeData = req.body;
  try {
    const insertQuery = `INSERT INTO nodes (chat_id, node_id, data) VALUES ($1, $2, $3) RETURNING *`;
    const values = [chat_id, node_id, data];
    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred.');
    }
  }
});

app.get('/nodes/:chat_id', async (req: Request, res: Response) => {
  const { chat_id } = req.params;
  try {
    const selectQuery = `SELECT * FROM nodes WHERE chat_id = $1`;
    const values = [chat_id];
    const result = await pool.query(selectQuery, values);
    res.status(200).json(result.rows);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred.');
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
