import express from 'express';
import db from "./db.js";
import {getLoggedInUser} from "./UserFunctions.js";
import {getPostTotal} from "./VoteFunctions.js";

const VoteRoutes = express.Router();

VoteRoutes.post('/vote/:direction/:postId', ((req, res) => {
  const token = req.cookies.token;
  getLoggedInUser(token).then(user => {

    const postId = req.params.postId;
    const direction = req.params.direction === 'up' ? 1 : -1;

    db.select('*')
      .from('votes')
      .where({
        post_id: postId,
        user_id: user.id,
      })
      .first()
      .then(vote => {
        if (!vote) {

          return db('votes').insert({
            post_id: postId,
            user_id: user.id,
            vote: direction,
          })
            .then(() =>
              getPostTotal(postId)
                .then(count => res.json(count).send())
                .catch(e => console.log(e) && res.status(422).send())
            )
            .catch(e => console.log(e) && res.status(422).send());

        }
        else if ( direction === vote.vote ) {

          // delete the vote
          return db('votes').where({id: vote.id}).del()
            .then(() =>
              getPostTotal(postId)
                .then(count => res.json(count).send())
                .catch(e => console.log(e) && res.status(422).send())
            )
            .catch(e => console.log(e) && res.status(422).send());

        } else {
          // update the vote
          return db('votes').where({id: vote.id}).update({vote:direction})
            .then(() =>
              getPostTotal(postId)
                .then(count => res.json(count).send())
                .catch(e => console.log(e) && res.status(422).send())
            )
            .catch(e => console.log(e) && res.status(422).send());

        }
      })
      .catch(e => {console.log(e); res.status(422).send();});

  });

}));

export default VoteRoutes;