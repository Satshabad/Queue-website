'use strict';

describe("UserService", function () {  

  beforeEach(module('queue'));

  describe('Login', function () {
    var mockFacebook;
    var deferred;
    var response;

  
    // first set up base for spys
    beforeEach(function () {
      // we don't care about the value since we will mock it
      mockFacebook = { login: "noop" }
      response = {accessToken: "123"}

      module(function ($provide) {
        $provide.value('Facebook', mockFacebook); 
      });

    })
    
    // spy on the base stuff
    beforeEach(inject(function ($q) {

      spyOn(mockFacebook, 'login').andCallFake(function () {
        deferred = $q.defer()
        return deferred.promise
      });

    }));

    it("should give access to the token", inject(function ($rootScope, User) {
      var wasCalled = false;

      User.login().then(function () {
        wasCalled = true;
        expect(User.getUser().accessToken).toEqual("123")
      }, function () {
        expect(false).toBe(true);
      });

      deferred.resolve(response)
      $rootScope.$apply();
      expect(wasCalled).toBe(true)

    }));


    it("should give not access to the token", inject(function ($rootScope, User) {
      var wasCalled = false
      User.login().then(function () {
        expect(false).toBe(true);
      }, function () {
        wasCalled = true
        expect(User.getUser().accessToken).not.toBeDefined()
      });

      deferred.reject()
      $rootScope.$apply();
      expect(wasCalled).toBe(true)

    }));

  });

  describe('getLoginStatus', function () {
    var mockFacebook, deferred, response;

    // set up base mocks
    beforeEach(function () {
      // we don't care about the value since we will mock it
      mockFacebook = { getLoginStatus: "noop" }
      response = {accessToken: "123"}

      module(function ($provide) {
        $provide.value('Facebook', mockFacebook); 
      });

    })
    
    // spy on the base stuff
    beforeEach(inject(function ($q) {

      spyOn(mockFacebook, 'getLoginStatus').andCallFake(function () {
        deferred = $q.defer()
        return deferred.promise
      });

    }));


    it("should pass us true and let use get the accessToken", inject(function ($rootScope, User) {
      var wasCalled = false

      User.getLoginStatus().then(function (loggedIn) {
        wasCalled = true;
        expect(loggedIn).toBe(true)
        expect(User.getUser().accessToken).toEqual("123")
      }, function () {
        expect(false).toBe(true);
      });

      deferred.resolve({loggedIn: true, authResponse: response})
      $rootScope.$apply();
      expect(wasCalled).toBe(true)

    }));

    it("should pass us false", inject(function ($rootScope, User) {
      var wasCalled = false;

      User.getLoginStatus().then(function (loggedIn) {
        wasCalled = true;
        expect(loggedIn).toBe(false)
      }, function () {
        expect(false).toBe(true);
      });

      deferred.resolve({loggedIn: false})
      $rootScope.$apply();
      expect(wasCalled).toBe(true)

    }));

  });

});
