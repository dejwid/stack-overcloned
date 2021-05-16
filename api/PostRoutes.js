import express from 'express';
import db from "./db.js";
import {getLoggedInUser} from "./UserFunctions.js";
import {getPostChildren} from "./PostsFunctions.js";

const PostRoutes = express.Router();

PostRoutes.get('/posts/:type/:postIds', ((req, res) => {
  const postIds = req.params.postIds.split(',');
  const {type} = req.params;
  const token = req.cookies.token;
  getLoggedInUser(token).then(user => {
    getPostChildren(postIds, type, user.id).then(comments => {
      res.json(comments).send();
    });
  })

}));

PostRoutes.post('/posts', ((req, res) => {
  const {content,postId,type} = req.body;
  getLoggedInUser(req.cookies.token).then(user => {
    db('posts').insert({
      title:null,
      content,
      type,
      parent_id:postId,
      author_id:user.id,
    }).then(() => {
      getPostChildren([postId], type).then(comments => res.json(comments).send());
    }).catch(console.log);
  });

}));

export default PostRoutes;