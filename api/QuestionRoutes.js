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
      db.raw('users.name'),
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
        db.select('*')
          .from('question_tags')
          .where({question_id:question.id})
          .join('tags','tags.id', '=', 'question_tags.tag_id')
          .then(tags => {
            res.json({question, tags});
          });
      })
      .catch(e => console.log(e) && res.status(422).send());
  });
});

QuestionRoutes.get('/questions', (req,res) => {
  const tagName = req.query.tagName;
  const token = req.cookies.token;

  const query = db.select(
      'posts.*',
      db.raw('group_concat(tags.name) as tags'),
      'users.email',
      'users.name',
      db.raw('users.id as user_id')
    )
    .from('posts')
    .leftJoin('question_tags', 'question_tags.question_id', '=', 'posts.id')
    .leftJoin('tags', 'tags.id', '=', 'question_tags.tag_id')
    .join('users', 'users.id', '=', 'posts.author_id')
    .where({
      parent_id: null,
    })
    .orderBy('posts.id', 'desc')
    .groupBy('posts.id');

    if (tagName) {
      query.having('tags', 'like', '%'+tagName+'%');
    }

    if (!tagName && token) {
      getLoggedInUser(token)
        .then(user => {
          db.select('tag_id')
            .from('user_tags')
            .where({user_id:user.id})
            .then(userTags => {
              if (userTags.length > 0) {
                query.whereIn('question_tags.tag_id', userTags.map(tag => tag.tag_id));
              }
              query.then(questions => {
                res.json(questions).send();
              }).catch(() => res.status(422).send());
            });
        });
    } else {
      query.then(questions => {
        res.json(questions).send();
      }).catch(e => console.log(e) && res.status(422).send());
    }
});

export default QuestionRoutes;