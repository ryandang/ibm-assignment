angular.module("ibmAssignmentApp", [
    "ngRoute",
    "flickrPhotos",
    "ngAnimate",
    "ui.bootstrap",
    "infinite-scroll",
    "directives.ngClick"
])

.constant("flickrConfig", {
    APIKEY: "a5e95177da353f58113fd60296e1d250",
    USER_ID: "132365033@N08",
    PHOTOS_PER_LOAD: 6,
    FAIL_STATUS: "fail"
})

.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .otherwise({
        redirectTo: "flickr-photos"
    });

    // This will remove the # symbols from the url
    $locationProvider.html5Mode(true);
})

.controller("AppController", function($scope, $location, flickr, flickrConfig) {
    $scope.flickrPhotos = {
        isLoading: true
    };
    $scope.sort = {
        sortBy: "alphabetical"
    };
    $scope.search = {};

    flickr.getPublicPhotos()
    .then(function(data) {
        if (data.stat === flickrConfig.FAIL_STATUS) {
            return alert(data.message);
        }

        data.photos.photo = _.sortBy(data.photos.photo, "title");

        $scope.flickrPhotos.allPhotos = angular.copy(data.photos.photo);

        // Load the first set of photos
        if (data.photos.photo.length > flickrConfig.PHOTOS_PER_LOAD) {
            $scope.flickrPhotos.photos = data.photos.photo.splice(0, flickrConfig.PHOTOS_PER_LOAD);
            $scope.flickrPhotos.remainPhotos = data.photos.photo;
        } else {
            $scope.flickrPhotos.photos = data.photos.photo;
            $scope.flickrPhotos.remainPhotos = [];
        }

        $scope.flickrPhotos.isLoading = false;
    });

    $scope.viewPhoto = function(photo) {
        $location.url("flickr-photo/" + photo.id);
    };
});
