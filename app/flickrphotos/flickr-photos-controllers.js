angular.module("flickrPhotos.controllers", [])

.controller("flickrPhotosController", function($scope, flickrConfig) {
    $scope.search.searchPhoto = null;

    $scope.loadMorePhotos = function() {
        if (!$scope.flickrPhotos.photos || $scope.flickrPhotos.remainPhotos.length === 0) {
            return;
        }

        var morePhotos = $scope.flickrPhotos.remainPhotos.splice(0, flickrConfig.PHOTOS_PER_LOAD);

        // Append the next set of photos to the photos array.
        $scope.flickrPhotos.photos = $scope.flickrPhotos.photos.concat(morePhotos);
    };

    $scope.setBackGroundImage = function(photo) {
        var backgroundImage = { "background-image": "url(https://farm" + photo.farm + ".staticflickr.com/" +
            photo.server + "/" + photo.id + "_"  + photo.secret + ".jpg)" };

        return backgroundImage;
    };

    $scope.sortPhotos = function() {
        var allPhotos = angular.copy($scope.flickrPhotos.allPhotos);

        if ($scope.sort.sortBy === "reverse") {
            allPhotos.reverse();
        }

        // Load the first set of photos
        if (allPhotos.length > flickrConfig.PHOTOS_PER_LOAD) {
            $scope.flickrPhotos.photos = allPhotos.splice(0, flickrConfig.PHOTOS_PER_LOAD);
            $scope.flickrPhotos.remainPhotos = allPhotos;
        } else {
            $scope.flickrPhotos.photos = allPhotos;
            $scope.flickrPhotos.remainPhotos = [];
        }
    };
})

.controller("flickrViewPhotoController", function($scope, $routeParams, flickr, flickrConfig) {
    var photoId = $routeParams.photoId;

    $scope.flickrPhotos.isLoading = true;
    $scope.photoSizes = {};
    $scope.selectedPhoto = {};

    flickr.getPhotoSize(photoId)
    .then(function(data) {
        if (data.stat === flickrConfig.FAIL_STATUS) {
            return alert(data.message);
        }

        if (data.sizes.size.length === 0) {
            return;
        }

        $scope.photoSizes.allPhotoSizes = data.sizes.size;
        $scope.selectedPhoto.photo = $scope.photoSizes.allPhotoSizes[0];
    });

    flickr.getPhotoInfo(photoId)
    .then(function(data) {
        if (data.stat === flickrConfig.FAIL_STATUS) {
            return alert(data.message);
        }

        $scope.selectedPhoto.info = data.photo;
        $scope.flickrPhotos.isLoading = false;
    });

    $scope.updateSelectedPhoto = function(photo) {
        $scope.selectedPhoto.photo = photo;
    };
});
