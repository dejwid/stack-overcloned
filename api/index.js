import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3030;
const secret = 'secret123';

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.get('/', ((req, res) => {
  res.send('test');
}));

app.get('/profile', ((req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      res.status(403).send();
    } else {
      res.json(data).send();
    }
  });
}));

app.post('/login', ((req, res) => {
  const {email,password} = req.body;
  const isLoginOk = email === 'test@example.com' && password === 'test';
  isLoginOk && jwt.sign(email, secret, (err, token) => {
    if (err) {
      res.status(403).send();
    } else {
      res.cookie('token', token).send();
    }
  });

  if (!isLoginOk) {
    res.status(403).send();
  }

}));

app.listen(port, () => {
  console.log('listening on port:'+port);
});