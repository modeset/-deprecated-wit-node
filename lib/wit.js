(function() {
  "use strict";

  var https = require('https');
  var Q = require('q');

  var Wit = {
    token: process.env.WIT_TOKEN,

    message: function(message, token) {
      var deferred = Q.defer();
      var options = {
        host: 'api.wit.ai',
        path: '/message?q=' + encodeURIComponent(message),
        headers: {Authorization: 'Bearer ' + typeof token === 'string' ? token : Wit.token}
      };

      https.request(options, function(response) {
        var content = '';
        response.on('data', function (chunk) { content += chunk });

        response.on('end', function () {
          switch(response.statusCode) {
            case 200:
              deferred.resolve(new Wit.Result(JSON.parse(content)));
              break;
            case 401:
              deferred.reject(new Error('incorrect token set for Wit::TOKEN set an env for WIT_TOKEN or set Wit::TOKEN manually'));
              break;
            default:
              deferred.reject(new Error('WitError: statusCode was ' + response.statusCode));
          }
        });
      }).on('error', function(e) {
        deferred.reject(new Error(e));
      }).end();

      return deferred.promise;
    }
  };

  Wit.Result = function(obj) {
    var outcome = obj['outcomes'][0];
    this.raw = obj;
    this.text = obj['_text'];
    this.intent = outcome['intent'];
    this.confidence = outcome['confidence'];
    this.entities = {};
    for (var name in outcome['entities']) {
      this.entities[name] = new Wit.Entity(outcome['entities'][name][0]);
    }
  };

  Wit.Entity = function(obj) {
    this.start = obj['start'];
    this.end = obj['end'];
    this.value = obj['value'];
    this.body = obj['body'];
  };

  module.exports = Wit;

})();

