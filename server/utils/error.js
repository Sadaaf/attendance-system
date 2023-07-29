function error(msg, status = 400) {
  const e = new Error(msg);
  e.status = status;
  return e;
}

module.exports = error;
