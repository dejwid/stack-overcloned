import express from 'express';
import db from "./db.js";
import {getLoggedInUser} from "./UserFunctions.js";
import {getPostComments} from "./CommentFunctions.js";

const CommentRoutes = express.Router();

CommentRoutes.get('/comments/:postId', ((req, res) => {
  const postId = req.params.postId;
  const token = req.cookies.token;
  getLoggedInUser(token).then(user => {
    getPostComments(postId, user.id).then(comments => {
      res.json(comments).send();
    });
  })

}));

CommentRoutes.post('/comments', ((req, res) => {
  const {content,postId} = req.body;
  getLoggedInUser(req.cookies.token).then(user => {
    db('posts').insert({
      title:null,
      content,
      parent_id:postId,
      author_id:user.id,
    }).then(() => {
      getPostComments(postId).then(comments => res.json(comments).send());
    });
  });

}));

export default CommentRoutes;