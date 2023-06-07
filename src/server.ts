import express from 'express';
const app = express();
const port = 3000;
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send({ message: 'pong' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
