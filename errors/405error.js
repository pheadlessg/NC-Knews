exports.handle405 = (req, res, next) => {
  res.status(405).send({ message: 'Method not allowed' });
};
