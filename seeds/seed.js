const ENV = process.env.NODE_ENV;
const { articleData, userData, commentData, topicData } =
  ENV === "test"
    ? require("../db/data/test-data/")
    : require("../db/data/development-data/");
const {
  makeRefObj,
  formatArticles,
  formatComments
} = require("../utils/utils");
refObj = {};

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex("topics").del(),
    knex("users").del(),
    knex("articles").del(),
    knex("comments").del()
  ]).then(() => {
    return knex("topics")
      .insert(topicData)
      .then(() => {
        return knex("users")
          .insert(userData)
          .returning("*");
      })
      .then(userdocs => {
        const userRefObj = makeRefObj(userdocs, "username", "user_id");
        const formattedArticles = formatArticles(articleData, userRefObj);
        return knex("articles")
          .insert(formattedArticles)
          .returning("*")
          .then(articledocs => {
            const articleRefObj = makeRefObj(
              articledocs,
              "title",
              "article_id"
            );
            const formattedComments = formatComments(
              commentData,
              userRefObj,
              articleRefObj
            );
            return knex("comments").insert(formattedComments);
          });
      });
  });
};
