'use strict';

describe("FacebookService",function () {

  beforeEach(module('queue'));

  describe("Login", function () {
  var mockFB, response, didSucceed;

    beforeEach(inject(function ($q) {
      mockFB = { login: "noop" }
      response = { authResponse: {accessToken: "123" } } 

      spyOn(mockFB, 'login').andCallFake(function (callback) {
        if (didSucceed){
          response.status = "connected";
          callback(response)
        }
      });
      
    }));

    it("should give access to authResponse", inject(function (Facebook, $rootScope) {
      var wasCalled = false;
      Facebook.init(mockFB) 
      didSucceed = true

      Facebook.login().then(function (authResponse) {
        wasCalled = true
        expect(authResponse.accessToken).toEqual("123")
      }, function () {
        expect(false).toBe(true);
      });

      $rootScope.$apply();
      expect(wasCalled).toBe(true)
      
    }));


    it("should throw an error if FB is undefined", inject(function (Facebook) {
      expect(Facebook.login).toThrow();
    }));

  })


  describe("getLoginStatus", function () {

  var mockFB, response, setLoggedin;

    beforeEach(inject(function ($q) {
      mockFB = { getLoginStatus: "noop" }
      response = { authResponse: {accessToken: "123" } } 

      spyOn(mockFB, 'getLoginStatus').andCallFake(function (callback) {
        if (setLoggedin){
          response.status = "connected";
          callback(response)
        }
      });
      
    }));


    it("should give access to authResponse", inject(function (Facebook, $rootScope) {
      var wasCalled = false;
      Facebook.init(mockFB) 
      setLoggedin = true

      Facebook.getLoginStatus().then(function (authResponse) {
        wasCalled = true
        expect(response.authResponse.accessToken).toEqual("123")
        expect(response.loggedIn).toEqual(true)
      }, function () {
        expect(false).toBe(true);
      });

      $rootScope.$apply();
      expect(wasCalled).toBe(true)
      
    }));

    it("should throw an error if FB is undefined", inject(function (Facebook) {
      expect(Facebook.getLoginStatus).toThrow();
    }));
    
  })
  
});
