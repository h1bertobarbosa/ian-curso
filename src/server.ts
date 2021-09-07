import express, { Request, Response } from 'express';
import { v4 } from 'uuid';
const app = express();
app.use(express.json());

interface ClientBody {
  nome: string;
  phone: string;
  email: string;
}

const clients: ClientBody[] = [];

app.post('/clients', (request: Request, response: Response) => {
  const { email, nome, phone } = request.body as ClientBody;
  const client = { email, nome, phone, id: v4() };
  clients.push(client);

  return response.status(201).json(client);
});

app.get('/clients', (request: Request, response: Response) => {
  return response.status(200).json(clients);
});

app.listen(3000);
