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
 */
var restify = require('restify')
var server = restify.createServer()
// Used pegrammar.txt to generate parser.js
var parser = require('./parser');

server.name = 'LogDNA Challenge - Muaz'
server.get('/jsonify/:text', respond)
server.head('/jsonify/:text', respond)

server.listen(3000, function() {
  var left = 9;
	console.log('%s listening at %s', server.name, server.url)
})

// Main function: consumes plain text query and outputs JSON based on search rules shown above
function respond(req, res, next) {
    // Basic check for properly formatted parentheses
    if(!checkParentheses(req.params.text)) {
      console.log("Incorrectly formatted parentheses")
    }

    response = parser.parse(req.params.text)

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

var pegGrammar = ""
