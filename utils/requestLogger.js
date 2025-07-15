const morgan = require('morgan')

// Declare custom body token once, outside middleware so it doesn't repeat
morgan.token('body', (req) => JSON.stringify(req.body))

// Using custom function to format the log
const requestLogger = morgan((tokens, req, res) => {

  // Adding default tokens in correct format order to array
  let log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]

  // Append body only for POST requests with a non-empty body
  if (req.method === 'POST' && req.body && Object.keys(req.body).length > 0) {
    log.push(tokens.body(req))
  }

  // Join the array into one string and return
  return log.join(' ')
})

module.exports = requestLogger