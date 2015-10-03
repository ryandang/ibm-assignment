angular.module("flickr.services", [])

.factory("flickr", function($http, flickrConfig) {
    function flickr() {}

    flickr.getPublicPhotos = function() {
        return $http({
            method: "GET",
            url: "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" +
            flickrConfig.APIKEY + "&user_id=" + flickrConfig.USER_ID + "&format=json&nojsoncallback=1"
        })
        .then(function(res) {
            return res.data;
        });
    };

    flickr.getPhotoSize = function(photoId) {
        photoId = photoId || "";

        return $http({
            method: "GET",
            url: "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" +
            flickrConfig.APIKEY + "&photo_id=" + photoId + "&format=json&nojsoncallback=1"
        })
        .then(function(res) {
            return res.data;
        });
    };

    flickr.getPhotoInfo = function(photoId) {
        photoId = photoId || "";

        return $http({
            method: "GET",
            url: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" +
            flickrConfig.APIKEY + "&photo_id=" + photoId + "&format=json&nojsoncallback=1"
        })
        .then(function(res) {
            return res.data;
        });
    };

    return flickr;
});
