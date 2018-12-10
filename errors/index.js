exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: 'Page not found' });
  } else next(err);
};

exports.handle400 = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad Request' });
  } else next(err);
};

exports.handle422 = (err, req, res, next) => {
  if (err.code === '23505') {
    res
      .status(422)
      .send({ msg: 'Slug already in use. Please use a unique slug.' });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.message });
  } else {
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
};
