import express, { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
const app = express();
app.use(express.json());

interface ClientBody {
  id?: string;
  name: string;
  phone: string;
  email: string;
}

let clients: ClientBody[] = [];

function checkEmailExists(request: Request, response: Response,next: NextFunction) {
  const { email } = request.body as ClientBody;
  const position = clients.findIndex((client) => client.email === email)

  if(position > -1) {
    return response.status(400).json({msg: 'Email already exists'});
  }

  next()
}

app.get('/clients', (request: Request, response: Response) => {
  return response.status(200).json(clients);
});

app.delete('/clients/:id',(request: Request, response: Response) => {
  const {id} = request.params

  const position = clients.findIndex((client) => client.id === id)

  if(position === -1) {
    return response.status(404).json({msg: 'Not found'});
  }

  clients = clients.filter((client) => client.id !== id)

  return response.sendStatus(204);
});

app.use(checkEmailExists)

app.post('/clients', (request: Request, response: Response) => {
  const { email, name, phone } = request.body as ClientBody;
  const client = { email, name, phone, id: v4() };
  clients.push(client);

  return response.status(201).json(client);
});

app.put('/clients/:id',(request: Request, response: Response) => {
  const {id} = request.params
  const { email, name, phone } = request.body as ClientBody;
  const position = clients.findIndex((client) => client.id === id)

  if(position === -1) {
    return response.status(404).json({msg: 'Not found'});
  }

  clients[position] = { ...clients[position],email, name, phone}

  return response.status(200).json({client: clients[position]});
});



app.listen(3000);
