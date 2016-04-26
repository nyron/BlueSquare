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
]);

function RouterFunction($stateProvider){
  $stateProvider
  .state("index", {
    url: "/",
    templateUrl: "ng-views/picture.index.html",
    controller: "indexCtrl",
    controllerAs: "indexVM"
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

})();
