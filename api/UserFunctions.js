import db from "./db.js";

export function getLoggedInUser(token) {
  return db.select('*')
    .from('users')
    .where({token})
    .first();
}