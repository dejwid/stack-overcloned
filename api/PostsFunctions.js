import db from "./db.js";

export function getPostChildren(postIds, type, userId = null) {
  if (!userId) {
    userId = -1;
  }
  if (type.substr(type.length-1, 1) === 's' ) {
    type = type.substr(0, type.length-1);
  }
  return db.select(
    'posts.*',
    'users.email',
    db.raw('users.name as user_name'),
    db.raw('sum(votes.vote) as votes_sum'),
    db.raw('user_vote.vote as user_vote')
  )
    .leftJoin(db.raw('votes on votes.post_id = posts.id'))
    .leftJoin(db.raw('votes user_vote on user_vote.post_id = posts.id and user_vote.user_id = '+userId))
    .from('posts')
    .join('users', 'users.id', '=', 'posts.author_id')
    .groupBy('posts.id')
    .whereIn('parent_id', postIds)
    .where({
      type,
    });
}