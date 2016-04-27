//= require angular.min
//= require angular-resource.min
//= require angular-ui-router.min

"use strict";

(function(){

  angular
  .module("BlueSquare", [
    "ui.router",
    "ngResource"
  ])
.config([
  "$stateProvider",
  RouterFunction
])
.factory("Picture", [
  "$resource",
  JsonFactoryFunction
])
.controller("indexCtrl",[
  "Picture",
  IndexControllerFunction
])
.controller("showCtrl", [
  "Picture",
  "$stateParams",
  ShowControllerFunction
])
.directive("noteform",[
  "Picture",
  NoteFormFunction
])

function RouterFunction($stateProvider){
  $stateProvider
  .state("index", {
    url: "/",
    templateUrl: "ng-views/picture.index.html",
    controller: "indexCtrl",
    controllerAs: "indexVM"
  })
  .state("show", {
    url: "/:id",
    templateUrl: "ng-views/picture.show.html",
    controller: "showCtrl",
    controllerAs: "showVM"
  });
}

function JsonFactoryFunction($resource){
  var Picture = $resource("/pictures/:id.json", {}, {
    update: {method: "PUT"}
  });
  Picture.all = Picture.query();
  return Picture;
}

function IndexControllerFunction(Picture){
  var indexVM = this;
  indexVM.pictures = Picture.all;
  indexVM.newPicture = new Picture();
}
function ShowControllerFunction(Picture, $stateParams){
  var showVM = this;
  Picture.all.$promise.then(function(){
    Picture.all.forEach(function(picture){
      if(picture.id == $stateParams.id){
        showVM.picture = picture;
      }
    });
  });
}

function NoteFormFunction(Picture){
  return{
    templateUrl: "ng-views/picture.form.html",
    scope: {
      picture: "=",
      formMethod: "@"
    },
    link: function(scope){
      scope.create = function(){
        Picture.save(scope.picture, function(response){
          Picture.all.push(response);
        });
      }
      scope.update = function(){
        Picture.update({id: scope.picture.id},
          scope.picture, function(response){
          });
      };
    }
  };
}

})();
