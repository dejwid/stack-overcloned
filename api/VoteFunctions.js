import db from "./db.js";

export function getPostTotal(postId) {
  return new Promise((resolve, reject) => {
    db.select(db.raw('sum(vote) as c'))
      .from('votes')
      .where({post_id: postId,})
      .first()
      .then(row => resolve(row.c === null ? 0 : row.c))
      .catch(reject);
  });

}