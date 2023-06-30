import express, { Request, Response } from 'express';
import fs from 'fs';

const port = 3000;
const app = express();

let users: IUser[] = [];

interface IUser {
  id: string;
  userName: string;
  email: string;
  password: string;
  birthday: Object;
}

app.use(express.json());

fs.readFile('db.json', 'utf-8', (err, data) => {
  if (err) {
    console.log('erro');
  } else {
    users = JSON.parse(data);
  }
});

app.post('/user', (req: Request, res: Response) => {
  const { id, userName, email, password, birthday }: IUser = req.body;

  const user: IUser = {
    id,
    email,
    userName,
    password,
    birthday,
  };

  users.push(user);

  fs.writeFile('db.json', JSON.stringify(users), (err) => {
    if (err) {
      console.log('erro');
    } else {
      console.log('deu bom');
    }
  });
  return res.send(users);
});

app.get('/user', (req: Request, res: Response) => {
  return res.send(users);
});

app.delete('/user/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = users.findIndex((userId) => userId.id === id);
  users.splice(userId, 1);

  return res.send('item removido com sucesso');
});

app.put('/user/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { userName } = req.body;
  const userId = users.findIndex((userId) => userId.id === id);

  users[userId] = {
    ...users[userId],
    userName,
  };

  res.send('Username alterado com sucesso');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
