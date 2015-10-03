angular.module("directives.ngClick", [])

.constant("KEY_CODES", {
    ENTER_KEY: 13
})

.directive("ngClick", function(KEY_CODES, $parse) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            element.on("keydown", function(event) {
                var clickHandler = $parse(attrs.ngClick);

                if (event.keyCode === KEY_CODES.ENTER_KEY) {
                    event.preventDefault();
                    event.stopPropagation();

                    scope.$apply(function() {
                        clickHandler(scope, { $event: event });
                    });
                }
            });
        }
    };
});
