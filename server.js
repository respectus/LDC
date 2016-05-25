/*
 * LogDNA Challenge - by Muaz
 *    A basic text to JSON parser accessed through a simple REST API.
 *    Makes use of Parsing Expression Grammar to implement the given search rules.
 *    Search Rules:
 *        - terms are implicitly AND'd together unless quoted
 *        - terms are implicitly an exact match
 *        - multiple search terms can be nested using ()'s
 *        - negation can be done using ! in front of search term
 *        - OR'ing search terms can be done by explicitly using "OR" keyword
 *        - AND'ing search terms can optionally be done by explicitly using "AND" keyword
 *        - using '>', '>=', '<', '=<' denotes a non exact match on the term following respective symbol
 *        - using '=' denotes an exact match on the term following respective symbol
 *        - len(#) will allow us to match length of JSON data instead of actual value
 *        - 'true', 'false' will be matched to their boolean values instead of string values
 *
 *    API can be accessed at http://ldchallenge-muaz.herokuapp.com/jsonify  the plain text query should
 *    be passed in with the POST request as the query parameter. Demonstrated in check.js
 */
var restify = require('restify')
var server = restify.createServer()
// Used pegrammar.txt to generate parser.js
var parser = require('./parser');
server.name = 'LogDNA Challenge - Muaz'
server.use(restify.bodyParser());

/* Typically a GET request is issued for searches, but there are no constraints
   given on the length of the search query therefore I have chosen to use a POST
   request. */
server.post('/jsonify', respond);

server.get(/\//, restify.serveStatic({
  directory: './public',
  file: 'index.html'
}));
server.listen(process.env.PORT || 3000, function() {
	console.log('%s listening at %s', server.name, server.url)
})

// Main function: consumes plain text query and outputs JSON based on search rules shown above
function respond(req, res, next) {
    query = req.body.query
    // Naive sanity check
    if(!checkParentheses(query)) {
      console.log("Incorrectly formatted parentheses")
    }
    response = parser.parse(query)
    res.send(response)
    next()
}

function checkParentheses(text) {
  var count = 0
  var char = ''
  for(var i = 0; i < text.length; i++) {
    char = text[i]
    if(char == '(') {
      count++
    } else if(char == ')') {
      count--
    }
    if(count < 0) {
      return false
    }
  }
  return count == 0
}
