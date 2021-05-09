import express from 'express';
import db from "./db.js";
import {getLoggedInUser} from "./UserFunctions.js";

const QuestionRoutes = express.Router();

QuestionRoutes.post('/questions', (req,res) => {
  const {title,content} = req.body;
  const tagIds = req.body.tags;
  const {token} = req.cookies;
  db.select('id')
    .from('users')
    .where({token})
    .first()
    .then(user => {
      if (user && user.id) {
        db('posts').insert({
          title,
          content,
          parent_id: null,
          author_id: user.id,
        }).then(questionId => {
          const questionTags = [];
          tagIds.forEach(tagId => {
            questionTags.push({question_id:questionId,tag_id:tagId});
          });
          db('question_tags').insert(questionTags)
            .then(() => res.json(questionId).sendStatus(201))
            .catch(() => res.sendStatus(422));
        }).catch(() => res.sendStatus(422));
      } else {
        res.sendStatus(403);
      }
    })

});

QuestionRoutes.get('/questions/:id', (req, res) => {
  const id = req.params.id;
  getLoggedInUser(req.cookies.token).then(user => {
    db.select(
      'posts.*',
      db.raw('users.email'),
      db.raw('votes2.vote as user_vote'),
      db.raw('sum(votes.vote) as vote_sum')
    )
      .from('posts')
      .join('users', 'users.id', '=', 'posts.author_id')
      .leftJoin('votes', 'posts.id', '=', 'votes.post_id')
      .leftJoin(db.raw('votes votes2 on votes2.post_id = posts.id and votes2.user_id = '+user.id))
      .where({'posts.id':id})
      .groupBy('posts.id')
      .first()
      .then(question => {
        db.select('*').from('question_tags')
          .join('tags','tags.id', '=', 'question_tags.tag_id')
          .then(tags => {
            res.json({question, tags});
          });
      })
      .catch(e => console.log(e) && res.status(422).send());
  });
});

QuestionRoutes.get('/questions', (req,res) => {
  db
    .select('*')
    .from('posts')
    .where({parent_id: null})
    .orderBy('id', 'desc')
    .then(questions => {
      res.json(questions).send();
    })
    .catch(() => res.status(422).send());
});

export default QuestionRoutes;