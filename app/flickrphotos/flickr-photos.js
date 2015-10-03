angular.module("flickrPhotos", ["flickrPhotos.controllers", "flickr.services"])

.config(function($routeProvider) {
    $routeProvider
    .when("/flickr-photos", {
        title: "Flickr Photos",
        templateUrl: "flickrphotos/flickr-photos.tpl.html",
        controller: "flickrPhotosController",
    })
    .when("/flickr-photo/:photoId", {
        title: "Flickr Photos",
        templateUrl: "flickrphotos/flickr-view-photo.tpl.html",
        controller: "flickrViewPhotoController",
    });
});
