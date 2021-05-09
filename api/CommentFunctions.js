import db from "./db.js";

export function getPostComments(postId, userId = null) {
  if (!userId) {
    userId = -1;
  }
  return db.select(
    'posts.*',
    'users.email',
    db.raw('sum(votes.vote) as votes_sum'),
    db.raw('user_vote.vote as user_vote')
  )
    .leftJoin(db.raw('votes on votes.post_id = posts.id'))
    .leftJoin(db.raw('votes user_vote on user_vote.post_id = posts.id and user_vote.user_id = '+userId))
    .from('posts')
    .join('users', 'users.id', '=', 'posts.author_id')
    .groupBy('posts.id')
    .where({
      parent_id: postId,
    });
}