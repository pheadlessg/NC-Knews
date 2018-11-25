process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const connection = require('../db/connection');
const request = require('supertest')(app);

describe('/api', () => {
  beforeEach(() => connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => connection.seed.run()));
  after(() => connection.destroy());

  describe('/', () => {
    it('GET : SUCCESS responds with 200 and JSON describing all available endpoints on the API', () => request.get('/api/').expect(200).then((res) => {
      expect(res.body).to.have.all.keys('articles', 'single_article', 'article_comments', 'topics', 'individual_topic_articles', 'individual_comments', 'users', 'single_user');
    }));
  });

  describe('/*', () => {
    it('GET : FAILURE responds with 404 when any other endpoint is accessed', () => request.get('/api/notapath').expect(404));
  });

  describe('/topics', () => {
    it('GET : SUCCESS responds with 200 status and an array of topic objects', () => request
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2);
        expect(res.body[0]).to.have.all.keys('slug', 'description');
      }));
    // it.only('OTHER METHODS : FAILURE responds with 405 when any method other than GET or POST is attempted', () => request.patch('/api/articles').expect(405));
    // it('OTHER METHOD : FAILURE responds with 405 when any method other than GET or POST is attempted', () => request.patch('/api/topics').expect(405),
    //   // const failMethods = ['DELETE', 'PUT', 'PATCH'];
    //   // return Promise.all(failMethods.map(method => request[method]('/api/topics').expect(405)));
    // );
    it('POST : SUCCESS creates a topic, responds with 201 status and the created topic', () => {
      const newTopic = {
        slug: 'this is the slug',
        description: 'this is the description',
      };
      return request
        .post('/api/topics')
        .send(newTopic)
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.all.keys('topic');
          expect(res.body.topic.slug).to.equal('this is the slug');
        });
    });
    it('POST : FAILURE responds with 422 when passed a non-unique topic', () => {
      const newTopic = {
        slug: 'mitch',
        description: 'none',
      };
      return request.post('/api/topics').send(newTopic).expect(422);
    });
    it('GET : SUCCESS responds with 200 and an array of article objects when given a parametric endpoint', () => request.get('/api/topics/mitch/articles?limit=50').expect(200).then((res) => {
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(11);
      expect(res.body[0]).to.have.all.keys('author', 'title', 'article_id', 'votes', 'comment_count', 'created_at', 'topic');
    }));
    it('POST : SUCCESS creates an article, responds with 201 status and the created article', () => {
      const newArticle = {
        title: 'this is the title',
        body: 'this is the body',
        user_id: 1,
      };
      return request.post('/api/topics/mitch/articles').send(newArticle).expect(201).then((res) => {
        expect(res.body).to.have.all.keys('article');
        expect(res.body.article.title).to.equal('this is the title');
        expect(res.body.article.user_id).to.equal(1);
        expect(res.body.article.article_id).to.equal(13);
      });
    });
    it('POST : FAILURE responds with 400 when passed an article with bad data types', () => {
      const newArticle = {
        title: 'this is the title',
        body: 'this is the body',
        user_id: 'this is the user_id',
      };
      return request.post('/api/topics/mitch/articles').send(newArticle).expect(400);
    });
    describe('TOPIC QUERIES', () => {
      it('GET : SUCCESS will accept a query for limit', () => request.get('/api/topics/mitch/articles?limit=2').expect(200).then((res) => {
        expect(res.body.length).to.equal(2);
      }));
      it('GET : SUCCESS will accept a query for sort_by', () => request.get('/api/topics/mitch/articles?sort_by=article_id').expect(200).then((res) => {
        expect(res.body[0].article_id).to.equal(12);
      }));
      it('GET : SUCCESS will accept a query for page number (p)', () => request.get('/api/topics/mitch/articles?limit=2&sort_by=article_id&p=1').expect(200).then((res) => {
        expect(res.body[0].article_id).to.equal(10);
      }));
      it('GET : SUCCESS will accept a query for sort_ascending', () => request.get('/api/topics/mitch/articles?sort_ascending=true').expect(200).then((res) => {
        expect(res.body[0].article_id).to.equal(11);
      }));
    });
  });

  describe('/articles', () => {
    it('GET : SUCCESS will respond with 200 and an array of all articles', () => request.get('/api/articles?limit=50').expect(200).then((res) => {
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.all.keys('author', 'title', 'article_id', 'votes', 'comment_count', 'created_at', 'topic', 'body');
      expect(res.body.length).to.equal(12);
      expect(res.body[0].article_id).to.equal(1);
    }));

    describe('/:article_id', () => {
      it('GET : SUCCESS will respond with 200 and an article object when given a parametric endpoint', () => request.get('/api/articles/1').expect(200).then((res) => {
        expect(res.body).to.have.all.keys('article');
        expect(res.body.article).to.have.all.keys('author', 'title', 'article_id', 'votes', 'comment_count', 'created_at', 'topic', 'body');
        expect(res.body.article.article_id).to.equal(1);
      }));
      it('GET : FAILURE will respond with 404 when a non-existant article is requested', () => request.get('/api/articles/50').expect(404));
      it('PATCH : SUCCESS will respond with 202 and the updated article when passed { inc_votes: newVote}', () => {
        const addVotes = {
          inc_votes: 10,
        };
        return request.patch('/api/articles/1').send(addVotes).expect(202).then((res) => {
          expect(res.body.article.article_id).to.equal(1);
          expect(res.body.article.votes).to.equal(110);
        });
      });
      it('DELETE : SUCCESS will respond with 204 and an empty object', () => request.delete('/api/articles/1').expect(204)
        .then(() => request.get('/api/articles/1').expect(404)));

      describe('/comments', () => {
        it('GET : SUCCESS will return an array of objects containing the comments for the :article_id', () => request.get('/api/articles/1/comments?limit=50').expect(200).then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.all.keys('comment_id', 'user_id', 'article_id', 'votes', 'created_at', 'body');
          expect(res.body.length).to.equal(13);
          expect(res.body[0].comment_id).to.equal(14);
        }));
        it('GET : FAILURE will respond with 404 when a non-existant comment is requested', () => request.get('/api/article/1/comments/123').expect(404));

        describe('COMMENT QUERIES', () => {
          it('GET : SUCCESS will accept a query for limit', () => request.get('/api/articles/1/comments?limit=2').expect(200).then((res) => {
            expect(res.body.length).to.equal(2);
          }));
          it('GET : SUCCESS will accept a query for sort_by', () => request.get('/api/articles/1/comments?sort_by=comment_id').expect(200).then((res) => {
            expect(res.body[0].comment_id).to.equal(15);
          }));
          it('GET : SUCCESS will accept a query for page number (p)', () => request.get('/api/articles/1/comments?limit=2&sort_by=comment_id&p=1').expect(200).then((res) => {
            expect(res.body[0].comment_id).to.equal(11);
          }));
          it('GET : SUCCESS will accept a query for sort_ascending', () => request.get('/api/articles/1/comments?limit=50&sort_ascending=true').expect(200).then((res) => {
            expect(res.body[0].comment_id).to.equal(15);
          }));
        });

        it('POST : SUCCESS creates a comment, responds with 201 status and the created comment', () => {
          const newComment = {
            user_id: 1,
            body: 'this is the comment',
          };
          return request.post('/api/articles/1/comments').send(newComment).expect(201).then((res) => {
            expect(res.body).to.have.all.keys('comment');
            expect(res.body.comment.article_id).to.equal(1);
            expect(res.body.comment.user_id).to.equal(1);
            expect(res.body.comment.body).to.equal('this is the comment');
            expect(res.body.comment.comment_id).to.equal(19);
          });
        });
      });
    });

    describe('ARTICLE QUERIES', () => {
      it('GET : SUCCESS will accept a query for limit', () => request.get('/api/articles?limit=2').expect(200).then((res) => {
        expect(res.body.length).to.equal(2);
      }));
      it('GET : SUCCESS will accept a query for sort_by', () => request.get('/api/articles?sort_by=article_id').expect(200).then((res) => {
        expect(res.body[0].article_id).to.equal(12);
      }));
      it('GET : SUCCESS will accept a query for page number (p)', () => request.get('/api/articles?limit=2&sort_by=article_id&p=1').expect(200).then((res) => {
        expect(res.body[0].article_id).to.equal(10);
      }));
      it('GET : SUCCESS will accept a query for sort_ascending', () => request.get('/api/articles?limit=50&sort_ascending=true').expect(200).then((res) => {
        expect(res.body[0].article_id).to.equal(11);
      }));
    });

    describe('/comments', () => {
      describe('/:comment_id', () => {
        it('PATCH : SUCCESS will respond with 202 and the updated comment when passed { inc_votes: newVote}', () => {
          const addVotes = {
            inc_votes: 1,
          };
          return request.patch('/api/comments/1').send(addVotes).expect(202).then((res) => {
            expect(res.body.comment.comment_id).to.equal(1);
            expect(res.body.comment.votes).to.equal(101);
          });
        });
        it('DELETE : SUCCESS will respond with 204 and an empty object', () => request.delete('/api/comments/1').expect(204)
          .then(() => request.get('/api/comments/1').expect(404))
          .then((res) => {
            expect(res.body).to.eql({});
          }));
      });
    });
  });
  describe('/users', () => {
    it('GET : SUCCESS returns 200 status and an array of user objects', () => request.get('/api/users').expect(200).then((res) => {
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);
      expect(res.body[0]).to.have.all.keys('user_id', 'username', 'avatar_url', 'name');
    }));
    describe('/:user_id', () => {
      it('GET : SUCCESS returns 200 status and a user object', () => request.get('/api/users/1').expect(200).then((res) => {
        expect(res.body).to.have.all.keys('user');
        expect(res.body.user.user_id).to.equal(1);
      }));
      it('GET : FAILURE will respond with 404 when a non-existant user is requested', () => request.get('/api/users/4').expect(404));
      it('GET : FAILURE will respond with 400 when given a malforned user:id', () => request.get('/api/users/notauser').expect(400));
    });
  });
});
