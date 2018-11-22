process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => connection.seed.run()));
  after(() => {
    connection.destroy();
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
    it('POST : SUCCESS creates a topic, responds with 201 status and the created topic', () => {
      const newTopic = {
        slug: 'this is the slug',
        description: 'this is the description',
      };
      request
        .post('/api/topics')
        .send(newTopic)
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.all.keys('topic');
          expect(res.body.topic.slug).to.equal('this is the slug');
        });
    });
    it('GET : SUCCESS responds with 200 and an array of article objects when given a parametric endpoint', () => {
      request.get('/api/topics/mitch/articles?limit=50').expect(200).then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(11);
        expect(res.body[0]).to.have.all.keys('author', 'title', 'article_id', 'votes', 'comment_count', 'created_at', 'topic');
      });
    });
    it('POST : SUCCESS creates an article, responds with 201 status and the created article', () => {
      const newArticle = {
        title: 'this is the title',
        body: 'this is the body',
        user_id: 1,
      };
      request.post('/api/topics/mitch/articles').send(newArticle).expect(201).then((res) => {
        expect(res.body).to.have.all.keys('article');
        expect(res.body.article.title).to.equal('this is the title');
        expect(res.body.article.user_id).to.equal(1);
        expect(res.body.article.article_id).to.equal(13);
      });
    });
    describe('TOPIC QUERIES', () => {
      it('GET : SUCCESS will accept a query for limit', () => {
        request.get('/api/topics/mitch/articles?limit=2').expect(200).then((res) => {
          expect(res.body.length).to.equal(2);
        });
      });
      it('GET : SUCCESS will accept a query for sort_by', () => {
        request.get('/api/topics/mitch/articles?sort_by=article_id').expect(200).then((res) => {
          expect(res.body[0].article_id).to.equal(12);
        });
      });
      it('GET : SUCCESS will accept a query for page number (p)', () => {
        request.get('/api/topics/mitch/articles?limit=2&sort_by=article_id&p=1').expect(200).then((res) => {
          expect(res.body[0].article_id).to.equal(10);
        });
      });
      it('GET : SUCCESS will accept a query for sort_ascending', () => {
        request.get('/api/topics/mitch/articles?sort_ascending=true').expect(200).then((res) => {
          expect(res.body[0].article_id).to.equal(11);
        });
      });
    });
  });
  describe('/articles', () => {
    it('GET : SUCCESS will respond with 200 and an array of all articles', () => {
      request.get('/api/articles?limit=50').expect(200).then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.all.keys('author', 'title', 'article_id', 'votes', 'comment_count', 'created_at', 'topic');
        expect(res.body.length).to.equal(12);
        expect(res.body[0].article_id).to.equal(1);
      });
    });
    describe('/:article_id', () => {
      it('GET : SUCCESS will respond with 200 and an article object when given a parametric endpoint', () => {
        request.get('/api/articles/1').expect(200).then((res) => {
          expect(res.body).to.have.all.keys('article');
          expect(res.body.article).to.have.all.keys('author', 'title', 'article_id', 'votes', 'comment_count', 'created_at', 'topic');
          expect(res.body.article.article_id).to.equal(1);
        });
      });
      it('PATCH : SUCCESS will respond with 202 and the updated article when passed { inc_votes: newVote}', () => {
        const addVotes = {
          inc_votes: 10,
        };
        request.patch('/api/articles/1').send(addVotes).expect(202).then((res) => {
          expect(res.body.article.article_id).to.equal(1);
          expect(res.body.article.votes).to.equal(110);
        });
      });
    });
    describe('ARTICLE QUERIES', () => {
      it('GET : SUCCESS will accept a query for limit', () => {
        request.get('/api/articles?limit=2').expect(200).then((res) => {
          expect(res.body.length).to.equal(2);
        });
      });
      it('GET : SUCCESS will accept a query for sort_by', () => {
        request.get('/api/articles?sort_by=article_id').expect(200).then((res) => {
          expect(res.body[0].article_id).to.equal(12);
        });
      });
      it('GET : SUCCESS will accept a query for page number (p)', () => {
        request.get('/api/articles?limit=2&sort_by=article_id&p=1').expect(200).then((res) => {
          expect(res.body[0].article_id).to.equal(10);
        });
      });
      it('GET : SUCCESS will accept a query for sort_ascending', () => {
        request.get('/api/articles?limit=50&sort_ascending=true').expect(200).then((res) => {
          expect(res.body[0].article_id).to.equal(11);
        });
      });
    });
  });
});
