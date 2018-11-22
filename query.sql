\c test_nc_news;

-- SELECT article_id, COUNT (comment_id) as count FROM comments
-- GROUP BY article_id;

SELECT articles.article_id, title, articles.body, articles.votes, articles.topic, username, 
COUNT (comment_id) as count 
FROM articles 
JOIN comments
ON articles.article_id = comments.article_id
JOIN users
ON articles.user_id = users.user_id
GROUP BY articles.article_id, users.user_id;

-- SELECT articles.article_id, title, articles.body, articles.votes, articles.topic, username,
-- COUNT (articles.article_id) as count 
-- FROM comments 
-- JOIN articles
-- ON articles.article_id = comments.article_id
-- JOIN users
-- ON articles.user_id = users.user_id
-- GROUP BY articles.article_id;