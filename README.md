# LDC
LD Challenge

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
 
 * Used pegrammar.txt to generate parser.js
 
 /* Typically a GET request is issued for searches, but there are no constraints
   given on the length of the search query therefore I have chosen to use a POST
   request. */
