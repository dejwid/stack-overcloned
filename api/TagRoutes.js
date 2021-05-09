import express from 'express';
import db from "./db.js";

const TagRoutes = express.Router();

TagRoutes.get('/tags', (req, res) => {
  db.select('*').from('tags').then(tags => {
    res.json(tags);
  }).catch(() => res.status(422).send());
});

export default TagRoutes;