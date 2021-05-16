import express from 'express';
import jwt from "jsonwebtoken";
import knex from 'knex';
import bcrypt from 'bcrypt';
import db from './db.js';
import {getLoggedInUser} from "./UserFunctions.js";

const UserRoutes = express.Router();
const secret = 'secret123';

UserRoutes.get('/profile', ((req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      res.status(403).send();
    } else {
      getLoggedInUser(token).then(user => {
        res.json(user);
      });
    }
  });
}));

UserRoutes.post('/login', ((req, res) => {
  const {email,password} = req.body;
  db.select('password')
    .where({email})
    .from('users')
    .first()
    .then(user => {
      const isLoginOk = bcrypt.compareSync(password, user.password);
      isLoginOk && jwt.sign(email, secret, (err, token) => {
        if (err) {
          res.status(403).send();
        } else {
          db('users').where({email}).update({token})
            .then(() => res.cookie('token', token).send('ok'))
            .catch(() => res.sendStatus(422));
        }
      });

      if (!isLoginOk) {
        res.status(403).send('Username or password mismatch');
      }
    })
    .catch(e => {
      res.status(422).send('something went wrong. Sorry');
      console.log(e);
    });


}));

UserRoutes.post('/register', ((req, res) => {
  const {email,password,name} = req.body;
  db
    .select('*')
    .from('users')
    .where({email})
    .then(rows => {
      if (rows.length === 0) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        db('users').insert({email,name,password:hashedPassword})
          .then(() => {
            jwt.sign(email, secret, (err, token) => {
              if (err) res.sendStatus(403);
              else {
                db('users')
                  .where({email})
                  .update({token})
                  .then(() => {
                    res.cookie('token', token)
                      .status(201)
                      .send('User created');
                  });
              }
            });
          })
          .catch(e => {
            console.log(e);
            res.status(422).send('User creation failed');
          });
      } else {
        res.status(422).send('Email already exists. Please try to login.');
      }
    })
    .catch(e => {
      console.log(e);
      res.status(422).send(e);
    });
}));

UserRoutes.post('/logout', ((req, res) => {
  res.clearCookie('token').send('ok');
}));

UserRoutes.post('/profile', ((req, res) => {
  const token = req.cookies.token;
  const name = req.body.name;
  getLoggedInUser(token).then(user => {
    db('users').where({
      id: user.id,
    }).update({
      name,
    }).then(() => {
      res.status(200).send();
    });
  });
}));

UserRoutes.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db
    .select('users.name')
    .where({id:userId})
    .from('users')
    .first()
    .then(user => {
      db
        .select(
          'posts.*',
          db.raw('sum(votes.vote) as votes_sum')
        )
        .from('posts')
        .join('votes', 'posts.id', '=', 'votes.post_id')
        .where({author_id:userId})
        .groupBy('posts.id')
        .orderBy('votes_sum', 'desc')
        .limit(10)
        .then(votesInfo => {
          res.json({user, votesInfo});
        })
    })
});

export default UserRoutes;