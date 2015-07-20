(function() {
  describe('service', function() {
    beforeEach(module('myApp.services'));
    return describe('version', function() {
      return it('should return current version', inject(function(version) {
        return expect(version).toEqual('0.1');
      }));
    });
  });

}).call(this);
