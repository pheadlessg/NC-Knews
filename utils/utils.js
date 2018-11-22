exports.makeRefObj = (rows, column, id) => rows.reduce((refObj, row) => {
  const value = row[column];
  const key = row[id];
  refObj[value] = key;
  return refObj;
}, {});

exports.formatArticles = (articleArr, userRef) => articleArr.map((artdata) => {
  const {
    title, topic, created_by, body, created_at, votes,
  } = artdata;
  const time = new Date(created_at);
  return {
    title,
    topic,
    user_id: userRef[created_by],
    body,
    votes,
    created_at: time,
  };
});

exports.formatComments = (commentArr, userRef, articleRef) => commentArr.map((commentData) => {
  const {
    body, belongs_to, created_by, votes, created_at,
  } = commentData;
  const time = new Date(created_at);
  return {
    user_id: userRef[created_by],
    article_id: articleRef[belongs_to],
    votes,
    created_at: time,
    body,
  };
});
