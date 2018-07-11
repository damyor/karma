angular.module('karma', [])
    .controller('mainController', function ($scope, $http) {
        $scope.addNew = function () {
            $scope.adding = true;
        };

        $scope.confirmAdd = function () {
            $http.post('/api/addStory', {text: $scope.text});
            $scope.adding = false;
            $scope.text = null;
        };

        $scope.rejectAdd = function () {
            $scope.adding = false;
            $scope.text = null;
        };

        $scope.browse = function () {
            $scope.see = true;
            $http.get('/api/getStory').then(function (result) {
                $scope.story = result.data;
            });
        };

        $scope.rate = function (grade) {
            $http.post('/api/rateStory', {_id: $scope.story._id, grade: grade});
            $scope.see = false;
        };
    });
