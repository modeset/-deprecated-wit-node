var Wit = require('../index.js').wit;

describe("Wit", function() {

  describe(".message", function() {

    it("returns the expected output", function() {
      var promise
        , res;

      runs(function() {
        promise = Wit.message('deploy master foo to bar');
        promise.then(function(result) { res = result });
      });

      waitsFor(function() {
        return promise.isFulfilled()
      });

      runs(function() {
        expect( res instanceof Wit.Result ).toBe(true);
        expect( res.text ).toBe('deploy master foo to bar');
        expect( res.intent ).toBe('herokuapp:deploy');
        expect( res.entities.branch instanceof Wit.Entity).toBe(true);
        expect( res.entities.branch.value ).toBe('master')
      });
    });

  });

});
