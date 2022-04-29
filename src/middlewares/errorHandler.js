const errorHandler = (err, req, res, next) =>
  res.render('error', { title: err.message, error: err.message });

export default errorHandler;
