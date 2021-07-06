import express from 'express';
import cors from 'cors';
import serverless from "serverless-http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import UserRoutes from "./UserRoutes.js";
import QuestionRoutes from "./QuestionRoutes.js";
import TagRoutes from "./TagRoutes.js";
import VoteRoutes from "./VoteRoutes.js";
import PostRoutes from "./PostRoutes.js";

const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.get('/', ((req, res) => {
  res.send('test');
}));

app.use(UserRoutes);
app.use(QuestionRoutes);
app.use(TagRoutes);
app.use(VoteRoutes);
app.use(PostRoutes);

//app.listen(port, () => {
//  console.log('listening on port:'+port);
//});

module.exports.handler = serverless(app);
