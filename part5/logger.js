function logger(req, res, next) {
  const start = +new Date();
  const stream = process.stdout;
  const url = req.url;
  const method = req.method;

  res.on('finish', function() {
    const duration = +new Date();
    const message = `${method} \n to ${url} \n took ${duration}ms \n`;
    stream.write(message);
  });
  next();
}

module.exports = logger;
