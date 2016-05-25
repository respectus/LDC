/*
 *  Simple Test Cases to see if POST request works as intended
 */
var request = require('request');
var formData = {
  // Pass a plain text query
  query: '="TEST DATA" OR >len(9)' };

request.post({url:'http://ldchallenge-muaz.herokuapp.com/jsonify', formData: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
});
