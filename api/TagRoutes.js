import express from 'express';
import db from "./db.js";
import {getLoggedInUser} from "./UserFunctions.js";

const TagRoutes = express.Router();

TagRoutes.get('/tags', (req, res) => {
  const token = req.cookies.token;
  const query = db.select('*').from('tags');
  getLoggedInUser(token).then(user => {
    query.leftJoin(db.raw('user_tags on user_tags.tag_id = tags.id and user_tags.user_id = '+user.id));
    query.then(tags => {res.json(tags);});
  }).catch(() => {
    query.then(tags => {res.json(tags);});
  });
});

TagRoutes.post('/tags/follow', ((req, res) => {
  const {tagId,tagName} = req.body;
  const columnToCheck = tagId ? 'id' : 'name';
  const token = req.cookies.token;
  getLoggedInUser(token).then(user => {
    db
      .select('*')
      .from('tags')
      .where({[columnToCheck]: tagId?tagId:tagName})
      .first()
      .then(tag => {
        db('user_tags').insert({
          user_id: user.id,
          tag_id: tag.id,
        }).then(() => {
          res.status(200).send();
        });
      });
  });
}));

TagRoutes.post('/tags/unfollow', ((req, res) => {
  const {tagId,tagName} = req.body;
  const columnToCheck = tagId ? 'id' : 'name';
  const token = req.cookies.token;
  getLoggedInUser(token).then(user => {
    db
      .select('*')
      .from('tags')
      .where({[columnToCheck]: tagId?tagId:tagName})
      .first()
      .then(tag => {
        db('user_tags')
          .where({
            user_id: user.id,
            tag_id: tag.id,
          })
          .delete()
          .then(() => {
            res.status(200).send();
          });
      });
  });
}));

export default TagRoutes;