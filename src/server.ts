import express, { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import { Database } from "./database";
const app = express();
app.use(express.json());
const database = new Database();

interface ClientBody {
  id?: string;
  name: string;
  phone: string;
  email: string;
}

let clients: ClientBody[] = [];

function checkEmailExists(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email } = request.body as ClientBody;
  const position = clients.findIndex((client) => client.email === email);

  if (position > -1) {
    return response.status(400).json({ msg: "Email already exists" });
  }

  next();
}

app.get("/clients", async (request: Request, response: Response) => {
  const dbConn = database.connection;
  const res = await dbConn.query("select * from clients");
  return response.status(200).json({ clients: res.rows });
});

app.delete("/clients/:id", (request: Request, response: Response) => {
  const { id } = request.params;

  const position = clients.findIndex((client) => client.id === id);

  if (position === -1) {
    return response.status(404).json({ msg: "Not found" });
  }

  clients = clients.filter((client) => client.id !== id);

  return response.sendStatus(204);
});

app.use(checkEmailExists);

app.post("/clients", async (request: Request, response: Response) => {
  const { email, name, phone } = request.body as ClientBody;
  const dbConn = database.connection;
  const sql =
    "insert into clients(id,name,email,phone) values ($1,$2,$3,$4) returning *;";
  const values = [v4(), name, email, phone];

  const res = await dbConn.query(sql, values);

  return response.status(201).json({ client: res.rows });
});

app.put("/clients/:id", (request: Request, response: Response) => {
  const { id } = request.params;
  const { email, name, phone } = request.body as ClientBody;
  const position = clients.findIndex((client) => client.id === id);

  if (position === -1) {
    return response.status(404).json({ msg: "Not found" });
  }

  clients[position] = { ...clients[position], email, name, phone };

  return response.status(200).json({ client: clients[position] });
});

app.listen(3000);
