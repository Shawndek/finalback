const errorHandler = (err, req, res, next) => res.json({ error: err.message });

export default errorHandler;
