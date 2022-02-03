const errorHandler = (error, req, res, next) => {
  req.status(500);
  req.render('Internal server error');
}

module.exports = {
  errorHandler
};
